// app/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FiArrowRight, 
  FiStar, 
  FiShield, 
  FiZap,
  FiMoon,
  FiSun,
  FiMenu,
  FiX
} from "react-icons/fi";
import { getStyles } from "@/src/app/utils/them";

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const styles = getStyles(mode);

  const toggleTheme = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };

  const features = [
    {
      icon: <FiZap size={32} />,
      title: "Lightning Fast",
      description: "Built with Next.js for optimal performance and speed"
    },
    {
      icon: <FiShield size={32} />,
      title: "Secure by Default",
      description: "Enterprise-grade security with MongoDB integration"
    },
    {
      icon: <FiStar size={32} />,
      title: "Modern Design",
      description: "Beautiful UI with smooth animations and dark mode"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "10k+", label: "Users" },
    { value: "24/7", label: "Support" },
    { value: "50+", label: "Features" }
  ];

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.navbar}
      >
        <div style={styles.container} className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
            style={{ color: styles.heading.color }}
          >
            LOGO
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" style={{ color: styles.subHeading.color }} className="hover:opacity-80">
              Features
            </a>
            <a href="#about" style={{ color: styles.subHeading.color }} className="hover:opacity-80">
              About
            </a>
            <a href="#contact" style={{ color: styles.subHeading.color }} className="hover:opacity-80">
              Contact
            </a>
            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${getStyles(mode).border}`,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: styles.text
              }}
            >
              {mode === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={styles.button}
              onClick={() => router.push('/get-started')}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: styles.text
              }}
            >
              {mode === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: styles.text
              }}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col gap-4 py-4">
              <a href="#features" style={{ color: styles.subHeading.color }}>Features</a>
              <a href="#about" style={{ color: styles.subHeading.color }}>About</a>
              <a href="#contact" style={{ color: styles.subHeading.color }}>Contact</a>
              <motion.button
                whileTap={{ scale: 0.95 }}
                style={styles.button}
                onClick={() => router.push('/get-started')}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={styles.container}
        >
          <motion.h1
            style={styles.heading}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Build Something Amazing
          </motion.h1>
          
          <motion.p
            style={styles.subHeading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-lg"
          >
            Create stunning web applications with our modern tech stack. 
            Fast, secure, and beautifully designed for the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={styles.button}
              onClick={() => router.push('/get-started')}
              className="flex items-center gap-2"
            >
              Get Started <FiArrowRight />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={styles.buttonSecondary}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                style={styles.card}
                className="text-center"
              >
                <h3 style={{ ...styles.heading, fontSize: '2.5rem' }}>
                  {stat.value}
                </h3>
                <p style={styles.subHeading}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.section}>
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 style={{ ...styles.heading, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              Why Choose Us
            </h2>
            <p style={styles.subHeading} className="mt-4">
              Everything you need to build modern web applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={styles.card}
              >
                <div style={{ color: styles.heading.color }} className="mb-4">
                  {feature.icon}
                </div>
                <h3 style={{ ...styles.heading, fontSize: '1.5rem' }}>
                  {feature.title}
                </h3>
                <p style={styles.subHeading} className="mt-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              ...styles.card,
              textAlign: 'center',
              padding: '4rem 2rem',
              background: `linear-gradient(135deg, ${getStyles(mode).primary}, ${getStyles(mode).hover})`
            }}
          >
            <h2 style={{ ...styles.heading, color: '#fff' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: '#fff', opacity: 0.9 }} className="mt-4 mb-8 text-lg">
              Join thousands of developers building with our platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: '#fff',
                color: styles.heading.color,
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}
              onClick={() => router.push('/get-started')}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}