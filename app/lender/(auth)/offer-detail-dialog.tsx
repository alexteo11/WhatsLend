/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseDialog, {
  BaseDialogProps,
} from "@/app/components/common/BaseDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/lib/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/lib/tabs";
import { OfferData } from "@/schemas/offer.schema";
import React from "react";

interface OfferDetailDialogProps extends BaseDialogProps {
  offerData: OfferData;
  loanData: any;
}

const OfferDetailDialog = ({
  isOpen,
  onOpenChange,
  offerData,
  loanData,
}: OfferDetailDialogProps) => {
  return (
    <BaseDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="w-[50vw] min-w-[300px] p-10">
        <Tabs defaultValue="offerDetails" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="offerDetails">Offer Details</TabsTrigger>
            <TabsTrigger value="loanDetails">Loan Details</TabsTrigger>
          </TabsList>
          <TabsContent value="offerDetails">
            <Card>
              <CardHeader>
                <CardTitle>Offer Details</CardTitle>
                <CardDescription>
                  The following information is related to the offer you sent.
                  You can view and edit the information as needed.
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-semibold">User email</div>
                    <div>{"user1@gmail.com"}</div>
                    <div />
                    <div className="font-semibold">Loan Amount</div>
                    <div>$ {offerData.loanAmount}</div>
                    <div />
                    <div className="font-semibold">Tenure Months</div>
                    <div>{offerData.tenureMonths} months</div>
                    <div />
                    <div className="font-semibold">Repayment Period</div>
                    <div>{offerData.repaymentPeriod} months</div>
                    <div />
                    <div className="font-semibold">Interest Rate</div>
                    <div>{offerData.interestRate * 100}%</div>
                    <div />
                    <div className="font-semibold">Admin Fee</div>
                    <div>$ {offerData.adminFee}</div>
                    <div />
                    <div className="font-semibold">Late Interest Rate</div>
                    <div>{offerData.lateInterestRate * 100}%</div>
                    <div />
                    <div className="font-semibold">Late Charges</div>
                    <div>$ {offerData.lateCharges}</div>
                    <div />
                    <div className="font-semibold">Status</div>
                    <div>{offerData.status}</div>
                    <div />
                    <div className="font-semibold">Created At</div>
                    <div>{offerData.createdAt.toLocaleDateString()}</div>
                    <div />
                    <div className="font-semibold">Updated At</div>
                    <div>{offerData.updatedAt.toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="loanDetails">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>
                  Below are the detailed terms and conditions of the loan offer
                  you are about to accept. Please review them carefully to
                  ensure you understand all aspects of the loan agreement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xl font-semibold underline">
                  Personal Details
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="font-semibold">UINFIN</div>
                  <div>{loanData.personalDetails.uinfin}</div>
                  <div />
                  <div className="font-semibold">Occupation</div>
                  <div>{loanData.personalDetails.occupation}</div>
                  <div />
                  <div className="font-semibold">Full Name</div>
                  <div>{loanData.personalDetails.fullName}</div>
                  <div />
                  <div className="font-semibold">Sex</div>
                  <div>{loanData.personalDetails.sex}</div>
                  <div />
                  <div className="font-semibold">Nationality</div>
                  <div>{loanData.personalDetails.nationality}</div>
                  <div />
                  <div className="font-semibold">Date of Birth</div>
                  <div>{loanData.personalDetails.dob.toLocaleDateString()}</div>
                  <div />
                  <div className="font-semibold">Race</div>
                  <div>{loanData.personalDetails.race}</div>
                  <div />
                  <div className="font-semibold">Birth Country</div>
                  <div>{loanData.personalDetails.birthCountry}</div>
                  <div />
                  <div className="font-semibold">Residential Address</div>
                  <div>
                    {loanData.personalDetails.regadd.blkNo}{" "}
                    {loanData.personalDetails.regadd.buildingName},{" "}
                    {loanData.personalDetails.regadd.floorNo}{" "}
                    {loanData.personalDetails.regadd.postalCode}{" "}
                    {loanData.personalDetails.regadd.streetName}{" "}
                    {loanData.personalDetails.regadd.unitNo}
                  </div>
                  <div />
                  <div className="font-semibold">Residential Status</div>
                  <div>{loanData.personalDetails.residentialStatus}</div>
                  <div />
                  <div className="font-semibold">Pass Type</div>
                  <div>{loanData.personalDetails.passType}</div>
                  <div />
                  <div className="font-semibold">Pass Status</div>
                  <div>{loanData.personalDetails.passStatus}</div>
                  <div />
                  <div className="font-semibold">Pass Expiry Date</div>
                  <div>
                    {loanData.personalDetails.passExpiryDate.toLocaleDateString()}
                  </div>
                  <div />
                  <div className="font-semibold">Marital Status</div>
                  <div>{loanData.personalDetails.maritalStatus}</div>
                </div>
                <div className="pt-6">
                  <div className="text-xl font-semibold underline">
                    Contact Details
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-semibold">Email</div>
                    <div>{loanData.contactDetails.email}</div>
                    <div />
                    <div className="font-semibold">Mobile No</div>
                    <div>{loanData.contactDetails.mobileNo}</div>
                    <div />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="text-xl font-semibold underline">
                    Employment Details
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-semibold">Employer Name</div>
                    <div>{loanData.employmentDetails.employerName}</div>
                    <div />
                    <div className="font-semibold">Employment Sector</div>
                    <div>{loanData.employmentDetails.employmentSector}</div>
                    <div />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="text-xl font-semibold underline">
                    Property Details
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-semibold">Housing Type</div>
                    <div>{loanData.propertyDetails.hoousingType}</div>
                    <div />
                    <div className="font-semibold">HDB Type</div>
                    <div>{loanData.propertyDetails.hdbType}</div>
                    <div />
                    <div className="font-semibold">HDB Ownership</div>
                    <div>{loanData.propertyDetails.hdbOwnership}</div>
                    <div />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="text-xl font-semibold underline">
                    CPF Details
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-semibold">CPF Contributions</div>
                    <div>
                      {loanData.cpfDetails.cpfContributions.map((c: any) => (
                        <div key={c.month}>
                          {c.month}: {c.contribution}
                        </div>
                      ))}
                    </div>
                    <div />
                    <div className="font-semibold">CPF Housing Withdrawal</div>
                    <div>
                      {loanData.cpfDetails.cpfHousingWithdrawal.map(
                        (c: any) => (
                          <div key={c.month}>
                            {c.month}: {c.amount}
                          </div>
                        ),
                      )}
                    </div>
                    <div />
                    <div className="font-semibold">NOA History</div>
                    <div>
                      {loanData.cpfDetails.noaHistory.map((c: any) => (
                        <div key={c.month}>
                          {c.month}: {c.amount}
                        </div>
                      ))}
                    </div>
                    <div />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="text-xl font-semibold underline">
                    Vehicle Details
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-semibold">Effective Ownership</div>
                    <div>
                      {loanData.vehicleDetails.effectiveOwnership.map(
                        (c: any) => (
                          <div key={c.vehicleRegNo}>
                            {c.vehicleType} {c.vehicleMake} {c.vehicleModel}{" "}
                            {c.vehicleYear} {c.vehicleRegNo}{" "}
                            {c.vehicleCOEExpiry.toLocaleDateString()}
                          </div>
                        ),
                      )}
                    </div>
                    <div />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseDialog>
  );
};

export default OfferDetailDialog;
