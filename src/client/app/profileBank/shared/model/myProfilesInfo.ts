import { MasterData } from  '../../../shared/model/index';
export class Qualification {
  public CandidateID: string;
  public QualificationID: number;
  public Qualification: MasterData = new MasterData();
  public YearofPassing: number;
  public Marks: number;
  public Grade: MasterData = new MasterData();
}

export class MyProfilesInfo {
  public CandidateID: string;
  public Candidate: string;
  public FirstName: string;
  public MiddleName: string;
  public LastName: string;
  public PrimaryContact: string;
  public Email: string;
  public Tag: string;
  public Skills: Array<string>;
  public ResumeID: number;
  public Status = new MasterData();
  public Comments: string;
  public CandidateOtherDetails = new OtherDetails();
  public CandidateSalaryDetails = new SalaryDetails();
  public CandidateSkills = new Skills();
  public AadharCardNo: string = '';
  public CandidateTeamManagement = new TeamManagement();
  public CandidateCareerProfile = new CareerProfile();
  //for checkboxes for list
  public IsChecked: boolean;
  public url: any;


  //Properties of Personal Information
  public SecondaryContact: number;
  public District: string;
  public State = new MasterData();
  public Country = new MasterData();
  public PermanentAddress: string;
  public CurrentAddress: string;
  public PANNumber: string = '';
  public PassportNumber: string = '';
  public OutstationedCandidate: any;
  public ReadyToRelocate: any;
  public CommentsAdditionalInformation: string;
  public ResumeSource: string;
  public ReasonToRelocate: string;
  public FriendsRelatives: string;
  public IsCurrentSameAsPermanent: any;

  //properties of Qualification
  public CandidateQualification: Array<Qualification>;

  //Comments
  public FollowUpComments: string;
  public PreviousFollowupComments: string;
  public CommentsUpdated: boolean;

  //for Edit access
  public isAuthourized: boolean;
  public Owner: MasterData = new MasterData();
  public GrdOperations = new GridOperations();
}

export class TeamManagement {
  //properties of Candidate Team Management
  public TeamMgmt: any;
  public CandidateID: string;
  public TeamHandlingExperience: string;
  public NoofTeamMembers: number;
  public TeamMembersDesignations: string;
  public TeamHandlingChallenges: string;
  public CommentsUpdated: boolean;
  public FollowUpComments: string;
}
export class CareerProfile {
  //properties of Candidate Career Profile
  public TotalExperience: number;
  public CandidateID: string;
  public RelevantExperience: number;
  public CurrentCompany: string;
  public CurrentDesignationRole: string;
  public TimeSpentInCurrentCompany: number;
  public CommentsUpdated: boolean;
  public FollowUpComments: string;
}

export class Skills {
  public CandidateID: string;
  public ExpInSkill: string;
  public AnyFunctionalExp: string;
  public PrimarySkills: string;
  public SecondarySkills: string;
  public OtherSkills: string;
  public RoleAndResponsibility: string;
  public ProjectsDone: string;
  public TestingSkills: string;
  public Database: string;
  public InclinationToOtherTechnology: string;
  public AwareAboutTesting: string;
  public StrongTechnicalSkills: string;
  public CommentsUpdated: boolean;
  public FollowUpComments: string;
}

export class SalaryDetails {
  public CandidateID: string;
  public CurrentSalary: string='';
  public ExpectedSalary: string='';
  public TakeHomePay: number;
  public AnyPerks: string;
  public CTCIncludeVariable: any;
  public HowMuchVariable: number;
  public CommentsUpdated: boolean;
  public FollowUpComments: string;
}

export class OtherDetails {
  public CandidateID: string;
  public AppliedEarlier: any;
  public AppraisalBondContractDetails: string;
  public Visa: MasterData = new MasterData();
  public NoticePeriod: string = '';
  public RoleExpected: string;
  public ResignedStatusOfOfferedCandidate: string;
  public JobSerachPeriod: string;
  public FamilyBackground: string;
  public Strengths: string;
  public Weekness: string;
  public IfExstingCompanyOffers: string;
  public NoticePeriodNotCompletedCount: string;
  public LookingFor: string;
  public OfferInHand: any;
  public OfferDetails: string;
  public PrimaryReasonToQuitLastJob: string;
  public SecondaryReasonToQuitLastJob: string;
  public PrimaryReasonToQuitCurrentJob: string;
  public SecondaryReasonToQuitCurrentJob: string;
  public EarlierAppliedProcess: string;
  public OfferedCandidateStatus: string;
  public CommentsUpdated: boolean;
  public FollowUpComments: string;

}
export class ResumeMeta {
  public Profile: File;
  public CandidateID: string;
  public Overwrite: boolean;
}

export class AddCandidateResponse {
  public StatusCode: number;
  public Message: '';
  public ReasonCode: string;
  public ErrorMsg: string;
  public CandidateID: string;
}
export class TransferOwnershipMeta {
  public CandidateID: string;
  public OwnerType = new MasterData();
  public CurrentOwner = new MasterData();
  public OwnershipComments: string;
  public CandidateName: string;
  public CandidateIds: Array<string> = new Array<string>();
  public Owner = new MasterData();
}

export class GridOperations {
  public TotalItems: number;
  public ItemPerPage: number;
  // public OrderBy: string;
  // public OrderColumn: string;
  public PageNumber: number;
  public ItemID: string;

}


