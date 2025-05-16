from pydantic import BaseModel
from typing import Optional

class PPPRecordOut(BaseModel):
    borrowername: Optional[str]
    borroweraddress: Optional[str]
    borrowercity: Optional[str]
    borrowerstate: Optional[str]
    borrowerzip: Optional[str]
    loanstatus: Optional[str]
    initialapprovalamount: Optional[float]
    forgivenessamount: Optional[float]
    forgivenessdate: Optional[str]
    tin: Optional[str]

    class Config:
        orm_mode = True