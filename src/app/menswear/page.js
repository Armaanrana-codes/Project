'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineMail, HiOutlineLockClosed, HiOutlineEye,
  HiOutlineEyeOff, HiOutlineShieldCheck,
  HiOutlineExclamationCircle, HiOutlineArrowRight,
  HiOutlineMoon, HiOutlineSun, HiOutlineHome
} from 'react-icons/hi';

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState('light');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: '', password: '', remember: false
  });

  const bg      = mode === 'light' ? '#F9F5F5' : '#1A0A0D';
  const cardBg  = mode === 'light' ? '#FFFFFF' : '#2A1218';
  const border  = mode === 'light' ? '#F0E8E8' : '#4A2030';
  const muted   = mode === 'light' ? '#B0929A' : '#8A6A72';
  const textCol = mode === 'light' ? '#1A0A0D' : '#FFFFFF';
  const inputBg = mode === 'light' ? '#F9F5F5' : '#1F0F14';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    if (loginError) setLoginError('');
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await new Promise((res, rej) =>
        setTimeout(() => {
          form.email === 'admin@menswear.com' && form.password === 'admin123'
            ? res() : rej(new Error('Invalid email or password'));
        }, 1800)
      );
      form.remember
        ? localStorage.setItem('adminToken', 'mw-token-123')
        : sessionStorage.setItem('adminToken', 'mw-token-123');
      router.push('/menswear/dashboard');
    } catch (err) {
      setLoginError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: bg, color: textCol,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', fontFamily: 'sans-serif'
    }}>

      {/* Top buttons */}
      <div style={{ position: 'fixed', top: '1rem', right: '1rem',
                    display: 'flex', gap: '0.5rem', zIndex: 50 }}>
        <button onClick={() => router.push('/')}
          style={{ background: cardBg, border: `1px solid ${border}`,
                   borderRadius: '10px', padding: '8px', cursor: 'pointer',
                   color: textCol, display: 'flex' }}>
          <HiOutlineHome size={19}/>
        </button>
        <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}
          style={{ background: cardBg, border: `1px solid ${border}`,
                   borderRadius: '10px', padding: '8px', cursor: 'pointer',
                   color: textCol, display: 'flex' }}>
          {mode === 'light' ? <HiOutlineMoon size={19}/> : <HiOutlineSun size={19}/>}
        </button>
      </div>

      {/* Card */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '420px', backgroundColor: cardBg,
                 border: `1px solid ${border}`, borderRadius: '20px',
                 padding: '2.5rem 2rem',
                 boxShadow: '0 20px 60px rgba(122,0,25,0.10)' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #7A0019, #560012)',
            display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: '1rem',
            boxShadow: '0 8px 24px rgba(122,0,25,0.25)'
          }}>
            <HiOutlineShieldCheck size={32} color="#fff"/>
          </div>
          <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.8rem',
                       fontWeight: '700', letterSpacing: '3px' }}>
            <span style={{ color: '#7A0019' }}>MENS</span>
            <span style={{ color: textCol }}>WEAR</span>
          </h1>
          <p style={{ margin: 0, fontSize: '0.78rem', color: muted,
                      letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Admin Portal
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {loginError && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ marginBottom: '1rem', padding: '0.8rem 1rem',
                       borderRadius: '10px', border: '1px solid #DC2626',
                       backgroundColor: mode === 'light' ? '#FEE2E2' : '#451A1A',
                       display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <HiOutlineExclamationCircle size={18} color="#DC2626"/>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#DC2626' }}>
                {loginError}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem',
                            fontWeight: '500', marginBottom: '0.4rem', color: muted }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <HiOutlineMail size={17} style={{ position: 'absolute', left: '0.8rem',
                top: '50%', transform: 'translateY(-50%)', color: muted }}/>
              <input name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="admin@menswear.com"
                style={{ width: '100%', padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                         backgroundColor: inputBg, color: textCol,
                         border: `1px solid ${errors.email ? '#DC2626' : border}`,
                         borderRadius: '10px', fontSize: '0.87rem',
                         outline: 'none', boxSizing: 'border-box' }}/>
            </div>
            {errors.email && (
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.72rem', color: '#DC2626' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem',
                            fontWeight: '500', marginBottom: '0.4rem', color: muted }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <HiOutlineLockClosed size={17} style={{ position: 'absolute', left: '0.8rem',
                top: '50%', transform: 'translateY(-50%)', color: muted }}/>
              <input name="password" type={showPass ? 'text' : 'password'}
                value={form.password} onChange={handleChange}
                placeholder="Enter password"
                style={{ width: '100%', padding: '0.75rem 2.8rem 0.75rem 2.4rem',
                         backgroundColor: inputBg, color: textCol,
                         border: `1px solid ${errors.password ? '#DC2626' : border}`,
                         borderRadius: '10px', fontSize: '0.87rem',
                         outline: 'none', boxSizing: 'border-box' }}/>
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{ position: 'absolute', right: '0.8rem', top: '50%',
                         transform: 'translateY(-50%)', background: 'none',
                         border: 'none', cursor: 'pointer', color: muted,
                         padding: 0, display: 'flex' }}>
                {showPass ? <HiOutlineEyeOff size={17}/> : <HiOutlineEye size={17}/>}
              </button>
            </div>
            {errors.password && (
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.72rem', color: '#DC2626' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me */}
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center',
                            gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" name="remember" checked={form.remember}
                onChange={handleChange} style={{ display: 'none' }}/>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px',
                            border: `2px solid ${form.remember ? '#7A0019' : border}`,
                            backgroundColor: form.remember ? '#7A0019' : 'transparent',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', transition: 'all .2s' }}>
                {form.remember && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"
                    style={{ width: '11px', height: '11px' }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <span style={{ fontSize: '0.8rem', color: muted }}>Remember me</span>
            </label>
            <button type="button"
              style={{ background: 'none', border: 'none', color: '#7A0019',
                       fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer' }}>
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <motion.button type="submit" disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            style={{ padding: '0.9rem', borderRadius: '12px', border: 'none',
                     background: 'linear-gradient(135deg, #7A0019, #560012)',
                     color: '#fff', fontSize: '0.95rem', fontWeight: '600',
                     cursor: isLoading ? 'not-allowed' : 'pointer',
                     display: 'flex', alignItems: 'center',
                     justifyContent: 'center', gap: '0.5rem',
                     opacity: isLoading ? 0.7 : 1,
                     boxShadow: '0 4px 20px rgba(122,0,25,0.3)' }}>
            {isLoading ? 'Authenticating…' : (
              <> Sign In <HiOutlineArrowRight size={18}/> </>
            )}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0,
                    fontSize: '0.72rem', color: muted }}>
          Demo: <span style={{ color: '#7A0019' }}>admin@menswear.com</span> / admin123
        </p>
      </motion.div>
    </div>
  );
}