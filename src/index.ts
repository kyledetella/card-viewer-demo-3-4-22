import {
  CardViewerError,
  CardViewerFieldsInputError,
  CardViewerRequestError,
  InvalidCredentialError,
  renderFields
} from "@highnoteplatform/card-viewer";

import "./styles.css";

const paymentCardId = "MC43LmNkXzc4Nzc0MWVjM2JhNTFhY2VhMWRiMTI2YmFkZjY4MTVi";
const clientToken =
  "eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJydF92YXVsdF9jYXJkX2RldG9rZW5pemVfciI6WyJ7XCJrXCI6XCJwdWJsaWNfY2FyZF9pZFwiLFwidlwiOlwiY2RfNzg3NzQxZWMzYmE1MWFjZWExZGIxMjZiYWRmNjgxNWJcIn0iXSwiYXVkIjoicHJvZC50ZXN0LmFwaS5iYXkxLmNvbSIsIm9yZyI6Im9nX2JzMDFhM2E1NjJiNzBkNWQ0MjZiODQ2MDc3M2VjMWJkMGMxMCIsInJlZyI6IlVTQSIsImFwcGlkIjoiYXBfYmF5MTpjbGllbnRzZGs6MDAwMDAwMDAwMDAwMDAwMDAiLCJpc3MiOiJwcm9kLmF1dGguYmF5MS5jb20iLCJ0biI6InRuXzIzdXN0M3ByZmUzYzMwNjZjN2U3NGMzY2E1NDgxM2M1MzZkYjc0YTAiLCJleHAiOjE2NDY0MDk2NDYsImVudiI6InRlc3QiLCJpYXQiOjE2NDY0MDg3NDZ9.GJYhk6Vv1-T5ciX-3-5lHyaki_ARGXagBSiXmkCFHNbMTExo3IoHkvbYQ8vV6_DtksNo2nJF3jZbyBBeod-sVr8qZiY5Dwe6jrhib0HshE3EoWMZqgShysCL43SFaFyA3SPbpvV1FAAYmpVWWVqY8d8YlKLnl1LWrJDCVvHXWI0mJ-CRLzugLOG138P0AlEKHbkI0f1eUduwrCoNJ-u4eRW2zOkoHC9jWGMc0qpR7qHQPw-twZ-2USBOVvwk5DGl-Sj9kP4juRrAsPCTeiqoGh5MSGe5KAjbC-63-g1cfA7Ul6YeID_mykRjNG1C5fQdnjxfM37aVBs4e-49eXE66A";

const main = async () => {
  const toggleButton = document.querySelector(".toggleCardNumberMaskButton");

  if (!toggleButton) {
    throw new Error("Missing toggle button!");
  }

  const { toggleCardNumberMask } = await renderFields({
    paymentCardId,
    clientToken,

    onError: (
      error:
        | InvalidCredentialError
        | CardViewerRequestError
        | CardViewerFieldsInputError
        | CardViewerError
    ) => {
      // Render errors here
      console.error(`[Integrator error handler]:`, error);
    },

    elements: {
      cardNumber: {
        selector: "#cardNumber",
        styles: {
          fontFamily: "monospace",
          fontSize: "18px"
        }
      },
      cvv: {
        selector: "#cvv",
        styles: {
          fontFamily: "monospace",
          fontSize: "18px"
        }
      },
      expirationDate: {
        selector: "#expirationDate",
        styles: {
          fontFamily: "monospace",
          fontSize: "18px"
        }
      }
    }
  });

  toggleButton.addEventListener("click", async (event) => {
    if (toggleCardNumberMask) {
      await toggleCardNumberMask();
    }

    event.currentTarget.classList.toggle("masked");
  });
};

main().catch((err) => {
  console.log("err", err);
});
