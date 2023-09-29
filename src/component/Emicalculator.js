import classes from "./emi.module.css";
import { useEffect, useState } from "react";
export default function EmiCalculator() {
  // state manage
  const [principal, setPrincipal] = useState(300000 || "");
  const [time, setTime] = useState(1);
  const [rate, setrate] = useState(9);
  const [emi, setEmi] = useState(0);
  const [totalinterest, setTotalInterest] = useState("");
  const [totalInterestPercentage, setTotalInterestPercentage] = useState("");
  const [principalpercentage, setPrincipalPercentage] = useState("");
  const [tototalAmountpaying, setTototalAmountpaying] = useState("");

  //   Slider input Change Value
  const handleSliderChange = (name) => (value) => {
    if (name === "loanamount") {
      setPrincipal(value);
    } else if (name === "tenor") {
      setTime(value);
    } else if (name === "time") {
      setrate(value);
    }
  };

  //   Calculate Emi and total Interest any of the input calue change

  useEffect(() => {
    if (principal > 0 && rate > 0 && time > 0) {
      // convert annual rate to monthly rate
      const monthlyRate = rate / 12 / 100;
      // convert years to months
      const numberofPayments = time * 12;

      // calculation using math.pow
      const emi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberofPayments)) /
        (Math.pow(1 + monthlyRate, numberofPayments) - 1);

      // calculate total interest
      const totalinterest = emi * numberofPayments - principal;

      //   interst amount percentage %
      const totalAmountPaid = emi * numberofPayments;
      const totalInterestPercentage = (
        (totalinterest / totalAmountPaid) *
        100
      ).toFixed(2);
      // principal Amount percentage %
      const totalprincipalpercentage = (
        (principal / totalAmountPaid) *
        100
      ).toFixed(2);
      //   Total Amount Paid
      const totalAmountPay = (principal + totalinterest).toFixed(2);

      setEmi(emi.toFixed(2));
      setTotalInterest(totalinterest.toFixed(2));
      setTotalInterestPercentage(totalInterestPercentage);
      setPrincipalPercentage(totalprincipalpercentage);
      setTototalAmountpaying(totalAmountPay);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalInterestPercentage(0);
      setPrincipalPercentage(0);
    }
  }, [principal, rate, time]);
  // comma separated amount
  const emiamount = Math.round(emi);
  const amount = emiamount.toLocaleString();
  // total amount
  const totalAmountPays = Math.round(tototalAmountpaying);
  const totalamountbepaid = totalAmountPays.toLocaleString();
  //   total interest
  const totalinterestpays = Math.round(totalinterest);
  const totalinterestbepaid = totalinterestpays.toLocaleString();
  //   const principalAmount
  const principalAmount = Math.round(principal);
  const execpricipalamount = principalAmount.toLocaleString()
  return (
    <div className={classes.emicontainer}>
      <div className={classes.emibox}>
        <div className={classes.heading}>
          Loan Against Property EMI Calculator
        </div>
        <div className={classes.boxcenter}>
          <div className={classes.box}>
            <div className={classes.slidebox}>
              <div className={classes.loan}>
                <div>
                  <label className={classes.loanlabel}>Loan amount</label>
                </div>
                <div>
                  <div style={{ display: "flex", marginLeft: "10px" }}>
                    <div>Rs.</div>
                    <div className={classes.principal}>
                      <input
                        value={execpricipalamount || ""}
                        onChange={(e) =>
                          handleSliderChange("loanamount")(
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div>
                <input
                  className={classes.rangeinput}
                  type="range"
                  min="300000"
                  max="105000000"
                  step="1000"
                  value={principal}
                  onChange={(e) =>
                    handleSliderChange("loanamount")(parseFloat(e.target.value))
                  }
                />
              </div>
              <div className={classes.price}>
                <div>3L</div>
                <div className={classes.slide10}>10.50 Cr</div>
              </div>
              <div className={classes.loanTenor}>
                <div>
                  <label className={classes.loanlabel}>Tenor</label>
                </div>
                <div>
                  <div style={{ display: "flex", width: "100px" }}>
                    <div style={{ marginLeft: "50px", marginRight: "5px" }}>
                      {time}
                    </div>
                    <div>Years</div>
                  </div>
                  <hr />
                </div>
              </div>
              <div>
                <input
                  className={classes.rangeinput}
                  min="1"
                  max="15"
                  step="1"
                  value={time}
                  type="range"
                  onChange={(e) =>
                    handleSliderChange("tenor")(parseFloat(e.target.value))
                  }
                />
              </div>
              <div className={classes.price}>
                <div>1</div>
                <div>15</div>
              </div>
              <div className={classes.loanrate}>
                <div>
                  <label className={classes.loanlabel}>Rate of interest</label>
                </div>
                <div>
                  <div style={{ display: "flex", width: "60px" }}>
                    <div style={{ marginLeft: "34px", marginRight: "5px" }}>
                      {rate}
                    </div>
                    <div>%</div>
                  </div>
                  <hr />
                </div>
              </div>
              <div>
                <input
                  className={classes.rangeinput}
                  type="range"
                  min="9"
                  max="14"
                  step="0.1"
                  value={rate}
                  onChange={(e) =>
                    handleSliderChange("time")(parseFloat(e.target.value))
                  }
                />
              </div>
              <div className={classes.price}>
                <div>9</div>
                <div>14</div>
              </div>
            </div>
            <div className={classes.cardbox}>
              <div className={classes.emirs}>
                <div className={classes.emis}>Your EMI is Rs. </div>
                <div className={classes.youremi}>{amount}</div>
              </div>

              <hr style={{ color: "rgba(177, 171, 171, 0.425)" }} />
              <div className={classes.total}>
                <div className={classes.totalbox}>
                  <div className={classes.dotfle}>
                    <div className={classes.dot}></div>
                    <div className={classes.font}>
                      {Math.round(totalInterestPercentage)}%
                    </div>
                  </div>
                  <div className={classes.colorstyle}>Total interest</div>
                  <div className={classes.colorstyle}>
                    Rs. {totalinterestbepaid}
                  </div>
                </div>
                <div className={classes.totalbox}>
                  <div className={classes.dotfle}>
                    <div className={classes.dott}></div>
                    <div className={classes.font}>
                      {Math.round(principalpercentage)}%
                    </div>
                  </div>
                  <div className={classes.colorstyle}>Principal amount</div>
                  <div className={classes.colorstyle}>Rs. {execpricipalamount}</div>
                </div>
              </div>
              <hr
              className={classes.hr}
                // style={{
                //   color: "rgba(177, 171, 171, 0.425)",
                //   marginTop: "10px",
                // }}
              />
              <div className={classes.totalAmountPaid}>
                <div style={{ marginTop: "5px" }}>Total Amount Paid</div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "5px", marginTop: "5px" }}>
                    Rs.
                  </div>
                  <div className={classes.tabp}>
                    {totalamountbepaid}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
