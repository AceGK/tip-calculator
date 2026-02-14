"use client";

import { useState } from "react";
import styles from "@/styles/page.module.scss";
import Logo from "../../public/logo.svg";
import InputField from "@/components/input";
import ResetIcon from "../../public/icons/arrow-rotate-left.svg";
import ThemeToggle from "@/components/themeToggle";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function Amount({ value }: { value: string }) {
  return (
    <>
      <span className={styles.currencySymbol}>{value[0]}</span>
      {value.slice(1)}
    </>
  );
}

export default function Home() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [selectedTip, setSelectedTip] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [customTipMode, setCustomTipMode] = useState<"pct" | "amt">("pct");

  const billValue   = parseFloat(bill) || 0;
  const peopleValue = Math.max(1, parseInt(people) || 1);
  const tipAmount   = customTip !== ""
    ? customTipMode === "amt"
      ? parseFloat(customTip) / peopleValue
      : (billValue * parseFloat(customTip) / 100) / peopleValue
    : (billValue * (parseFloat(selectedTip) || 0) / 100) / peopleValue;
  const totalAmount = billValue / peopleValue + tipAmount;

  const tip = fmt.format(tipAmount);
  const total = fmt.format(totalAmount);
  const grandTotal = fmt.format(totalAmount * peopleValue);

  const reset = () => {
    setBill("");
    setPeople("");
    setSelectedTip("");
    setCustomTip("");
  };

  const shouldDisableReset = bill === "" && selectedTip === "" && customTip === "";

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
                      className={`${styles.radioLabel} ${isSelected ? styles.selected : ""}`}
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
                  <div className={styles.customTipToggle} data-mode={customTipMode}>
                    <span className={styles.modePill} aria-hidden />
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
              <div><Amount value={tip} /></div>
            </div>
            <div className={styles.item}>
              <div>
                <p>Total</p>
                <p>per person</p>
              </div>
              <div><Amount value={total} /></div>
            </div>
            <div className={styles.item}>
              <div>
                <p>Grand Total</p>
                <p>bill + tip</p>
              </div>
              <div><Amount value={grandTotal} /></div>
            </div>
            <div className={styles.resetContainer}>
              <button
                onClick={reset}
                className={`${styles.reset} ${shouldDisableReset ? styles.resetFaded : ""}`}
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
