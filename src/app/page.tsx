"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/page.module.scss";
import Logo from "/public/logo.svg";
import InputField from "@/components/input";
import ResetIcon from "/public/icons/arrow-rotate-left.svg";
import ThemeToggle from "@/components/themeToggle";

export default function Home() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [selectedTip, setSelectedTip] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [customTipMode, setCustomTipMode] = useState<"pct" | "amt">("pct");
  const [tip, setTip] = useState("$0.00");
  const [total, setTotal] = useState("$0.00");
  const [grandTotal, setGrandTotal] = useState("$0.00");

  useEffect(() => {
    const billValue = parseFloat(bill) || 0;
    const peopleValue = parseInt(people) || 1;
    let tipAmount: number;
    if (customTip !== "") {
      if (customTipMode === "amt") {
        tipAmount = parseFloat(customTip) / peopleValue;
      } else {
        tipAmount = (billValue * (parseFloat(customTip) / 100)) / peopleValue;
      }
    } else {
      const tipPct = parseFloat(selectedTip) || 0;
      tipAmount = (billValue * (tipPct / 100)) / peopleValue;
    }
    const totalAmount = billValue / peopleValue + tipAmount;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    setTip(formatter.format(tipAmount));
    setTotal(formatter.format(totalAmount));
    setGrandTotal(formatter.format(totalAmount * peopleValue));
  }, [bill, people, selectedTip, customTip, customTipMode]);

  const reset = () => {
    setBill("");
    setPeople("");
    setSelectedTip("");
    setCustomTip("");
    setTip("$0.00");
    setTotal("$0.00");
    setGrandTotal("$0.00");
  };

  const shouldDisableReset =
    bill === "" && selectedTip === "" && customTip === "";

  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        <ThemeToggle />
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.gridContainer}>
          <section className={styles.userInputs}>
            <div className={styles.inputRow}>
              <InputField
                type="number"
                name="bill"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholderText="Bill Total"
                required
                autoComplete="off"
                align="right"
                prefix="$"
              />

              <InputField
                type="number"
                name="people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholderText="People"
                required
                autoComplete="off"
                align="right"
              />
            </div>

            <div>
              <label htmlFor="tipPercentage" className={styles.formLabel}>
                Tip
              </label>
              <div className={styles.buttonsContainer}>
                {[10, 15, 20, 25].map((val) => {
                  const isSelected = selectedTip === String(val);
                  return (
                    <label
                      key={val}
                      className={`${styles.radioLabel} ${
                        isSelected ? styles.selected : ""
                      }`}
                      htmlFor={`tip-${val}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedTip(String(val));
                          setCustomTip("");
                        }
                      }}
                    >
                      <input
                        type="radio"
                        id={`tip-${val}`}
                        name="tip"
                        value={val}
                        checked={isSelected}
                        onChange={() => {
                          setSelectedTip(String(val));
                          setCustomTip("");
                        }}
                      />
                      {val}%
                    </label>
                  );
                })}

                <div className={styles.customTipInputWrapper}>
                  <div className={styles.customTipToggle}>
                    <button
                      className={`${styles.modeBtn} ${customTipMode === "pct" ? styles.modeBtnActive : ""}`}
                      onClick={() => setCustomTipMode("pct")}
                      type="button"
                    >%</button>
                    <button
                      className={`${styles.modeBtn} ${customTipMode === "amt" ? styles.modeBtnActive : ""}`}
                      onClick={() => setCustomTipMode("amt")}
                      type="button"
                    >$</button>
                  </div>
                  <InputField
                    type="number"
                    name="customTip"
                    value={customTip}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^0-9.]/g, "");
                      setCustomTip(cleaned);
                      setSelectedTip("");
                    }}
                    placeholderText={customTipMode === "pct" ? "Custom %" : "Custom $"}
                    autoComplete="off"
                    align="right"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.results}>
            <div className={styles.item}>
              <div>
                <p>Tip</p>
                <p>per person</p>
              </div>
              <div>{tip}</div>
            </div>
            <div className={styles.item}>
              <div>
                <p>Total</p>
                <p>per person</p>
              </div>
              <div>{total}</div>
            </div>
            <div className={styles.item}>
              <div>
                <p>Grand Total</p>
                <p>bill + tip</p>
              </div>
              <div>{grandTotal}</div>
            </div>
            <div className={styles.resetContainer}>
              <button
                onClick={reset}
                className={`${styles.reset} ${
                  shouldDisableReset ? styles.resetFaded : ""
                }`}
                disabled={shouldDisableReset}
              >
                <ResetIcon /> reset
              </button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
