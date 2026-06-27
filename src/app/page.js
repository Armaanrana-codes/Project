// app/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiSun,
  FiMoon,
  FiShield,
  FiTrendingUp,
  FiClock,
  FiStar,
  FiUsers,
  FiAward
} from "react-icons/fi";
import { getStyles } from "@/src/app/utils/them";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState("light");
  const styles = getStyles(mode);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") || "light";
    setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const features = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Premium Security",
      description: "Bank-grade encryption protecting your digital assets 24/7"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Market Insights",
      description: "Real-time analytics and AI-powered market predictions"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our optimized engine"
    }
  ];

  const stats = [
    { icon: <FiUsers className="w-6 h-6" />, value: "10M+", label: "Active Users" },
    { icon: <FiStar className="w-6 h-6" />, value: "4.9", label: "User Rating" },
    { icon: <FiAward className="w-6 h-6" />, value: "50+", label: "Awards Won" }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div style={styles.page}>
      {/* Navigation */}
      <motion.nav
        style={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ ...styles.container, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            whileHover={{ scale: 1.05 }}
          >
            <FiShield className="w-8 h-8" style={{ color: styles.button.backgroundColor }} />
            <span style={{ fontSize: "1.5rem", fontWeight: "700", color: styles.heading.color }}>
              Fortress
            </span>
          </motion.div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Features", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{ color: styles.heading.color, fontWeight: "500", textDecoration: "none" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={toggleTheme}
              style={{
                ...styles.buttonSecondary,
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {mode === "light" ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
            </motion.button>

            <motion.button
              style={styles.button}
              whileHover={{ scale: 1.05, backgroundColor: styles.button.backgroundColor }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/signup")}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={styles.hero}
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.h1 style={styles.heading} variants={fadeInUp}>
          Secure Your Digital Future
        </motion.h1>
        
        <motion.p
          style={{ ...styles.subHeading, maxWidth: "600px", fontSize: "1.2rem" }}
          variants={fadeInUp}
        >
          The most advanced digital fortress for protecting and growing your assets with military-grade security
        </motion.p>

        <motion.div
          style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}
          variants={fadeInUp}
        >
          <motion.button
            style={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
          >
            Launch Dashboard
            <FiArrowRight style={{ marginLeft: "0.5rem", display: "inline" }} />
          </motion.button>

          <motion.button
            style={styles.buttonSecondary}
            whileHover={{ scale: 1.05, backgroundColor: styles.buttonSecondary.color + "10" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/learn-more")}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{
            display: "flex",
            gap: "3rem",
            marginTop: "4rem",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              style={{ textAlign: "center" }}
              variants={fadeInUp}
              whileHover={{ scale: 1.1 }}
            >
              <div style={{ color: styles.button.backgroundColor, marginBottom: "0.5rem" }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: styles.heading.color }}>
                {stat.value}
              </div>
              <div style={{ color: styles.subHeading.color, fontSize: "0.9rem" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        style={styles.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={styles.container}>
          <motion.h2
            style={{ ...styles.heading, textAlign: "center", marginBottom: "3rem", fontSize: "2.5rem" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Fortress
          </motion.h2>

          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            }}
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                style={styles.card}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
              >
                <div style={{ color: styles.button.backgroundColor, marginBottom: "1rem" }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: styles.heading.color }}>
                  {feature.title}
                </h3>
                <p style={{ color: styles.subHeading.color, lineHeight: "1.6" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        style={{ ...styles.section, textAlign: "center" }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={styles.container}>
          <motion.div
            style={{
              ...styles.card,
              background: `linear-gradient(135deg, ${styles.button.backgroundColor}, ${styles.button.backgroundColor}dd)`,
              color: "#fff",
              padding: "4rem 2rem"
            }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
              Ready to Secure Your Assets?
            </h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9 }}>
              Join millions of users who trust Fortress with their digital security
            </p>
            <motion.button
              style={{
                ...styles.button,
                backgroundColor: "#fff",
                color: styles.button.backgroundColor,
                fontSize: "1.1rem"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/signup")}
            >
              Start Free Trial
              <FiArrowRight style={{ marginLeft: "0.5rem", display: "inline" }} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        style={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p>© 2024 Fortress. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy", "Terms", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={{ color: styles.subHeading.color, textDecoration: "none" }}
                  whileHover={{ color: styles.button.backgroundColor }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}