// styles.js

export const theme = {
  light: {
    background: "#F8F5F2",
    surface: "#FFFFFF",
    primary: "#7A0019",
    secondary: "#D4AF37",
    text: "#1A1A1A",
    textSecondary: "#666666",
    border: "#E5E5E5",
    hover: "#5C0013",
    shadow: "0 4px 20px rgba(0,0,0,0.08)",
  },

  dark: {
    background: "#0F0F0F",
    surface: "#1A1A1A",
    primary: "#8B001D",
    secondary: "#D4AF37",
    text: "#F5F5F5",
    textSecondary: "#B0B0B0",
    border: "#2A2A2A",
    hover: "#A00022",
    shadow: "0 4px 20px rgba(0,0,0,0.35)",
  },
};

export const getStyles = (mode = "light") => {
  const colors = theme[mode];

  return {
    page: {
      minHeight: "100vh",
      backgroundColor: colors.background,
      color: colors.text,
      transition: "all 0.3s ease",
    },

    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },

    card: {
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: colors.shadow,
      transition: "all 0.3s ease",
    },

    button: {
      backgroundColor: colors.primary,
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },

    buttonSecondary: {
      backgroundColor: "transparent",
      color: colors.secondary,
      border: `2px solid ${colors.secondary}`,
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },

    heading: {
      fontSize: "clamp(2rem, 5vw, 4rem)",
      fontWeight: "700",
      color: colors.primary,
      letterSpacing: "2px",
      textTransform: "uppercase",
    },

    subHeading: {
      fontSize: "1.2rem",
      color: colors.textSecondary,
      letterSpacing: "1px",
    },

    navbar: {
      backgroundColor: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
      padding: "1rem 2rem",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)",
    },

    hero: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      minHeight: "80vh",
      gap: "1.5rem",
    },

    section: {
      padding: "5rem 0",
    },

    input: {
      width: "100%",
      padding: "12px 16px",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      backgroundColor: colors.surface,
      color: colors.text,
      outline: "none",
    },

    footer: {
      padding: "2rem",
      textAlign: "center",
      borderTop: `1px solid ${colors.border}`,
      color: colors.textSecondary,
    },
  };
};