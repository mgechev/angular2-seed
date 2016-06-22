import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {FORM_DIRECTIVES} from '@angular/common';
import {Component} from '@angular/core';
import {CsvParseService} from "../../shared/services/csv-parse.service";
import {ImportListService, Transaction, CostCharacter, CostType} from "../../shared/services/import-list.service";
import {NG_TABLE_DIRECTIVES} from "ng2-table/ng2-table";
import {CostTypeSelector} from "./cost-type.selector";
import {VatTypeSelector} from "./vat-type.selector";
import {CostMatch, CostMatchService} from "../../shared/services/cost-match.service";
import Collection = _.Collection;
import {CostCharacterSelector} from "./cost-character.selector";

@Component({
  moduleId: module.id,
  selector: 'vat',
  providers: [CsvParseService, ImportListService, CostMatchService],
  templateUrl: 'vat.component.html',
  styleUrls: ['vat.component.css'],
  directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES, CostTypeSelector, VatTypeSelector, CostCharacterSelector]
})
export class VatComponent implements OnInit {
  uploadedFile: File;
  importedText: string;

  costMatches: Collection<CostMatch>;

  transactionsLoaded: number = 0;
  transactionsUnmatched: number;
  transactionsLongDescription: number = 0;
  public rows:Array<any> = [];

  public columns:Array<any> = [
    {title: 'Datum', name: 'dateFormatted'},
    {title: 'Bedrag', name: 'amount'},
    {title: 'Omschrijving', name: 'description'},
    {title: 'Type', name: 'costTypeDescription'},
    {title: 'Prive/Zakelijk', name: 'costCharacterDescription', sort: 'asc'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns, sortType: 'alphabetic'},
    filtering: {filterString: '', columnName: 'description'}
  };

  private transactions:Array<Transaction> = [];

  // TODO: extract cost match component
  public costMatch: CostMatch;

  constructor(private importListService: ImportListService, private costMatchService: CostMatchService) {
    this.uploadedFile = null;
    this.length = 0;
    this.costMatch = new CostMatch();
  }

  ngOnInit() {
    this.costMatches = this.costMatchService.getMatches();
  }

  displayVatTypeSelector() {
    return this.costMatch.costType != CostType.BUSINESS_FOOD;
  }

  private checkTransactions(): void {
    this.transactionsUnmatched = 0;
    this.transactionsLongDescription = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].costCharacter === CostCharacter.UNKNOWN) {
        this.transactionsUnmatched++;
      }
      if (this.transactions[i].description.length > 200) {
        this.transactionsLongDescription++;
      }
    }
    if (this.transactionsUnmatched === 0 && this.transactionsLongDescription > 0) {
      this.config.sorting.sortType = 'length';
    }
  }

  fileChangeEvent(fileInput: any){
    this.uploadedFile = fileInput.target.files[0];
    var reader = new FileReader();
    reader.onload = file => {
      var contents: any = file.target;
      this.importedText = contents.result;
      this.transactions = this.importListService.convert(this.importedText);
      this.transactionsLoaded = this.transactions.length;
      this.length = this.transactions.length;
      this.onChangeTable(this.config);
      if (this.transactionsLoaded) {
        this.checkTransactions();
      }
    };
    reader.readAsText(this.uploadedFile);

  }

  public addMatch():void {
    this.costMatch.matchString = this.config.filtering.filterString;
    this.costMatchService.addMatch(this.costMatch);

    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].description.indexOf(this.config.filtering.filterString) > -1) {
        switch (this.costMatch.costType) {
          case '3':
            this.transactions[i].costCharacter = CostCharacter.PRIVATE;
            break;
          default: {
            this.transactions[i].costType = this.costMatch.costType;
            this.transactions[i].costCharacter = CostCharacter.BUSINESS;
          }
        }
      }
    }
    this.checkTransactions();

    this.config.filtering.filterString = '';
    this.onChangeTable(this.config);
  }

  public addMatchDisabled():boolean {
    return this.config.filtering.filterString.length < 2;
  }

  // TODO: extract table component
  // FIXME: page counter doesn't work
  public changePage(page:any, data:Array<any> = this.transactions):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (this.config.sorting.sortType === 'alphabetic') {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      } else { // sort on length
        if (previous[columnName].length > current[columnName].length) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName].length < current[columnName].length) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      }
    });
  }

  public changeFilter(data:any, config:any):any {
    if (!config.filtering) {
      return data;
    }

    let filteredData:Array<any> = data.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.transactions, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
}
