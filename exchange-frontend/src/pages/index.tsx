import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const [rate, setRate] = useState<null | number>(
    null
  );
  const [amountEUR, setAmountEUR] = useState("");
  const [resultPLN, setResultPLN] = useState<
    null | number
  >(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/exchange/rate"
        );
        const data = await response.json();
        setRate(data.exchangeRate);
      } catch (error) {
        console.error(
          "Error fetching the exchange rate:",
          error
        );
      }
    };

    fetchExchangeRate();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(
      e.currentTarget
    );
    const amount = parseFloat(
      formData.get("amountEUR") as string
    );

    try {
      const response = await fetch(
        "http://localhost:3000/exchange/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await response.json();
      setResultPLN(data.transaction.amountInPLN);
    } catch (error) {
      console.error(
        "Error during calculating the exchange:",
        error
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Current EUR to PLN Exchange Rate</h1>
      {rate !== null ? (
        <span>1 EUR = {rate} PLN</span>
      ) : (
        <span>Loading...</span>
      )}

      <h1>Convert EUR to PLN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Amount in EUR:
          <input
            type="number"
            name="amountEUR"
            value={amountEUR}
            onChange={(e) =>
              setAmountEUR(e.target.value)
            }
            required
          />
        </label>
        <button type="submit">Convert</button>
      </form>

      {resultPLN !== null && (
        <span>
          {amountEUR} EUR = {resultPLN.toFixed(2)}{" "}
          PLN
        </span>
      )}
    </div>
  );
}
