
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MERCHANT_ID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"; // Replace with your Merchant ID

app.get("/verify", async (req, res) => {
  const { Authority, Status } = req.query;

  if (Status !== "OK") {
    return res.send("پرداخت لغو شد.");
  }

  try {
    const result = await axios.post("https://api.zarinpal.com/pg/v4/payment/verify.json", {
      merchant_id: MERCHANT_ID,
      amount: 1000,
      authority: Authority
    });

    const { data } = result;

    if (data?.data?.code === 100) {
      res.send(`پرداخت موفق بود. کد رهگیری: ${data.data.ref_id}`);
    } else {
      res.send("پرداخت ناموفق بود.");
    }
  } catch (err) {
    console.error(err);
    res.send("خطا در تأیید پرداخت.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
