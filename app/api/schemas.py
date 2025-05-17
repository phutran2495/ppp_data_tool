from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PPPRecordOut(BaseModel):
    tin: Optional[str] = Field(alias="loannumber")  # maps loannumber from DB to tin in API
    borrowername: Optional[str]
    borroweraddress: Optional[str]
    borrowercity: Optional[str]
    borrowerstate: Optional[str]
    borrowerzip: Optional[str]
    loanstatus: Optional[str]
    initialapprovalamount: Optional[float]
    forgivenessamount: Optional[float]
    forgivenessdate: Optional[datetime]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True



class PPPDetailedRecordOut(BaseModel):
    loannumber: str
    dateapproved: Optional[datetime]
    sbaofficecode: Optional[str]
    processingmethod: Optional[str]
    borrowername: Optional[str]
    borroweraddress: Optional[str]
    borrowercity: Optional[str]
    borrowerstate: Optional[str]
    borrowerzip: Optional[str]
    loanstatusdate: Optional[datetime]
    loanstatus: Optional[str]
    term: Optional[int]
    sbaguarantypercentage: Optional[float]
    initialapprovalamount: Optional[float]
    currentapprovalamount: Optional[float]
    undisbursedamount: Optional[float]
    franchisename: Optional[str]
    servicinglenderlocationid: Optional[int]
    servicinglendername: Optional[str]
    servicinglenderaddress: Optional[str]
    servicinglendercity: Optional[str]
    servicinglenderstate: Optional[str]
    servicinglenderzip: Optional[str]
    ruralurbanindicator: Optional[str]
    hubzoneindicator: Optional[str]
    lmiindicator: Optional[str]
    businessagedescription: Optional[str]
    projectcity: Optional[str]
    projectcountyname: Optional[str]
    projectstate: Optional[str]
    projectzip: Optional[str]
    cd: Optional[str]
    jobsreported: Optional[int]
    naicscode: Optional[str]
    race: Optional[str]
    ethnicity: Optional[str]
    utilities_proceed: Optional[str]
    payroll_proceed: Optional[str]
    mortgage_interest_proceed: Optional[str]
    rent_proceed: Optional[str]
    refinance_eidl_proceed: Optional[float]
    health_care_proceed: Optional[str]
    debt_interest_proceed: Optional[str]
    businesstype: Optional[str]
    originatinglenderlocationid: Optional[int]
    originatinglender: Optional[str]
    originatinglendercity: Optional[str]
    originatinglenderstate: Optional[str]
    gender: Optional[str]
    veteran: Optional[str]
    nonprofit: Optional[str]
    forgivenessamount: Optional[float]
    forgivenessdate: Optional[datetime]

    class Config:
        orm_mode = True