import {
  CardViewerError,
  CardViewerFieldsInputError,
  CardViewerRequestError,
  InvalidCredentialError,
  renderFields
} from "@highnoteplatform/card-viewer";

import "./styles.css";

// Add your clientToken and paymentCardId
const paymentCardId = "";
const clientToken = "";

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
