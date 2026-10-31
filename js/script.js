(function () {
  "use strict";

  const mobileMenu = document.querySelector(".mobile-nav");
  const resolutionDialog = document.getElementById("resolution-dialog");
  const resolutionButtons = document.querySelectorAll("[data-resolution]");
  const legalDialog = document.getElementById("legal-dialog");
  const legalDialogLinks = document.querySelectorAll("[data-legal-dialog]");
  let dialogTrigger = null;
  let dialogScrollPosition = 0;
  let dialogOriginCaptured = false;
  let legalDialogTrigger = null;
  let legalDialogScrollPosition = 0;

  const queryParameters = new URLSearchParams(window.location.search);
  const isLegalModalView =
    document.body.classList.contains("legal-page") &&
    queryParameters.get("vista") === "modal";

  if (isLegalModalView) {
    document.documentElement.classList.add("legal-modal-view");
    document.body.classList.add("legal-modal-view");

    document.querySelectorAll(
      "a[href='avis-legal.html'], a[href='politica-privacitat.html']"
    ).forEach(function (link) {
      link.href = link.getAttribute("href") + "?vista=modal";
    });

    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "legal-document-ready",
          title: document.title,
          path: window.location.pathname
        },
        "*"
      );
    }
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.removeAttribute("open");
      });
    });
  }

  if (resolutionDialog) {
    const dialogClose = resolutionDialog.querySelector(".resolution-dialog-close");
    const dialogPanels = resolutionDialog.querySelectorAll("[data-resolution-panel]");

    function closeResolutionDialog() {
      if (resolutionDialog.open) {
        resolutionDialog.close();
      }
    }

    resolutionButtons.forEach(function (button) {
      button.setAttribute("aria-controls", "resolution-dialog");
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("pointerdown", function () {
        dialogScrollPosition = window.scrollY;
        dialogOriginCaptured = true;
      });

      button.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          dialogScrollPosition = window.scrollY;
          dialogOriginCaptured = true;
        }
      });

      button.addEventListener("click", function () {
        const resolution = button.getAttribute("data-resolution");
        const activePanel = resolutionDialog.querySelector(
          "[data-resolution-panel='" + resolution + "']"
        );

        if (!activePanel || typeof resolutionDialog.showModal !== "function") {
          return;
        }

        dialogPanels.forEach(function (panel) {
          panel.hidden = panel !== activePanel;
        });

        dialogTrigger = button;
        if (!dialogOriginCaptured) {
          dialogScrollPosition = window.scrollY;
        }
        dialogOriginCaptured = false;
        button.setAttribute("aria-expanded", "true");
        resolutionDialog.setAttribute(
          "aria-labelledby",
          activePanel.querySelector("h2").id
        );
        document.documentElement.classList.add("dialog-open");
        document.body.classList.add("dialog-open");
        resolutionDialog.showModal();

        if (dialogClose) {
          dialogClose.focus({ preventScroll: true });
        }
      });
    });

    if (dialogClose) {
      dialogClose.addEventListener("click", closeResolutionDialog);
    }

    resolutionDialog.addEventListener("click", function (event) {
      if (event.target === resolutionDialog) {
        closeResolutionDialog();
      }
    });

    resolutionDialog.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        resolutionDialog.querySelectorAll(
          "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"
        )
      ).filter(function (element) {
        return !element.hidden && element.getClientRects().length > 0;
      });

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        focusableElements.length === 1 ||
        (event.shiftKey && document.activeElement === firstElement) ||
        (!event.shiftKey && document.activeElement === lastElement)
      ) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus({ preventScroll: true });
      }
    });

    resolutionDialog.addEventListener("close", function () {
      const triggerToRestore = dialogTrigger;
      const scrollPositionToRestore = dialogScrollPosition;

      document.documentElement.classList.remove("dialog-open");
      document.body.classList.remove("dialog-open");

      resolutionButtons.forEach(function (button) {
        button.setAttribute("aria-expanded", "false");
      });

      dialogTrigger = null;

      window.requestAnimationFrame(function () {
        if (Math.abs(window.scrollY - scrollPositionToRestore) > 1) {
          const previousScrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo(0, scrollPositionToRestore);
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
        }

        if (triggerToRestore) {
          triggerToRestore.focus({ preventScroll: true });
        }
      });
    });
  }

  if (legalDialog) {
    const legalDialogTitle = legalDialog.querySelector("#legal-dialog-title");
    const legalDialogClose = legalDialog.querySelector(".legal-dialog-close");
    const legalDialogFrame = legalDialog.querySelector(".legal-dialog-iframe");

    function closeLegalDialog() {
      if (legalDialog.open) {
        legalDialog.close();
      }
    }

    function modalDocumentUrl(href) {
      return href + (href.includes("?") ? "&" : "?") + "vista=modal";
    }

    legalDialogLinks.forEach(function (link) {
      link.setAttribute("aria-haspopup", "dialog");
      link.setAttribute("aria-controls", "legal-dialog");

      link.addEventListener("click", function (event) {
        if (
          typeof legalDialog.showModal !== "function" ||
          !legalDialogFrame ||
          !legalDialogTitle
        ) {
          return;
        }

        event.preventDefault();

        const href = link.getAttribute("href");
        const title = link.getAttribute("data-legal-title") || link.textContent.trim();

        legalDialogTrigger = link;
        legalDialogScrollPosition = window.scrollY;
        legalDialogTitle.textContent = title;
        legalDialogFrame.title = title;
        legalDialogFrame.src = modalDocumentUrl(href);

        document.documentElement.classList.add("dialog-open");
        document.body.classList.add("dialog-open");
        legalDialog.showModal();

        if (legalDialogClose) {
          legalDialogClose.focus({ preventScroll: true });
        }
      });
    });

    if (legalDialogClose) {
      legalDialogClose.addEventListener("click", closeLegalDialog);
    }

    legalDialog.addEventListener("click", function (event) {
      if (event.target === legalDialog) {
        closeLegalDialog();
      }
    });

    legalDialog.addEventListener("close", function () {
      const triggerToRestore = legalDialogTrigger;
      const scrollPositionToRestore = legalDialogScrollPosition;

      document.documentElement.classList.remove("dialog-open");
      document.body.classList.remove("dialog-open");
      legalDialogTrigger = null;

      window.requestAnimationFrame(function () {
        if (Math.abs(window.scrollY - scrollPositionToRestore) > 1) {
          const previousScrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo(0, scrollPositionToRestore);
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
        }

        if (triggerToRestore) {
          triggerToRestore.focus({ preventScroll: true });
        }
      });
    });

    window.addEventListener("message", function (event) {
      if (
        !legalDialogFrame ||
        event.source !== legalDialogFrame.contentWindow ||
        !event.data ||
        event.data.type !== "legal-document-ready"
      ) {
        return;
      }

      const isPrivacyDocument = String(event.data.path || "").endsWith(
        "politica-privacitat.html"
      );
      const title = isPrivacyDocument ? "Política de privacitat" : "Avís legal";
      const href = isPrivacyDocument ? "politica-privacitat.html" : "avis-legal.html";

      legalDialogTitle.textContent = title;
      legalDialogFrame.title = title;

    });
  }

})();
