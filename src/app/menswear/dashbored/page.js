'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlineShoppingBag, HiOutlineUsers, HiOutlineCurrencyRupee,
  HiOutlineClipboardList, HiOutlineLogout, HiOutlineMoon,
  HiOutlineSun, HiOutlineHome, HiOutlinePlus, HiOutlineEye,
  HiOutlinePencil, HiOutlineTrash, HiOutlineMenu, HiOutlineX,
  HiOutlineBell, HiOutlineChartBar, HiOutlineTag
} from 'react-icons/hi';

// ── Fake Data ──────────────────────────────────────────────
const STATS = [
  { label: 'Total Orders',    value: '1,284', icon: <HiOutlineClipboardList size={22}/>, color: '#7A0019' },
  { label: 'Total Products',  value: '342',   icon: <HiOutlineShoppingBag   size={22}/>, color: '#1D4ED8' },
  { label: 'Total Customers', value: '5,621', icon: <HiOutlineUsers          size={22}/>, color: '#047857' },
  { label: 'Revenue',         value: '₹8.4L', icon: <HiOutlineCurrencyRupee size={22}/>, color: '#B45309' },
];

const ORDERS = [
  { id: '#MW001', customer: 'Rahul Sharma',  product: 'Slim Fit Suit',     amount: '₹4,299', status: 'Delivered' },
  { id: '#MW002', customer: 'Amit Singh',    product: 'Casual Shirt',       amount: '₹899',   status: 'Pending'   },
  { id: '#MW003', customer: 'Vikas Gupta',   product: 'Formal Trousers',    amount: '₹1,499', status: 'Shipped'   },
  { id: '#MW004', customer: 'Rohit Verma',   product: 'Winter Jacket',      amount: '₹2,999', status: 'Pending'   },
  { id: '#MW005', customer: 'Suresh Kumar',  product: 'Ethnic Kurta Set',   amount: '₹1,799', status: 'Delivered' },
];

const PRODUCTS = [
  { id: 'P001', name: 'Slim Fit Suit',   category: 'Suits',   price: '₹4,299', stock: 24 },
  { id: 'P002', name: 'Casual Shirt',    category: 'Shirts',  price: '₹899',   stock: 87 },
  { id: 'P003', name: 'Formal Trousers', category: 'Bottoms', price: '₹1,499', stock: 53 },
  { id: 'P004', name: 'Winter Jacket',   category: 'Jackets', price: '₹2,999', stock: 12 },
  { id: 'P005', name: 'Ethnic Kurta Set',category: 'Ethnic',  price: '₹1,799', stock: 38 },
];

const STATUS_COLOR = {
  Delivered: { bg: '#D1FAE5', color: '#065F46' },
  Pending:   { bg: '#FEF3C7', color: '#92400E' },
  Shipped:   { bg: '#DBEAFE', color: '#1E40AF' },
};

const NAV = [
  { key: 'dashboard', label: 'Dashboard',  icon: <HiOutlineChartBar    size={20}/> },
  { key: 'orders',    label: 'Orders',     icon: <HiOutlineClipboardList size={20}/> },
  { key: 'products',  label: 'Products',   icon: <HiOutlineShoppingBag size={20}/> },
  { key: 'customers', label: 'Customers',  icon: <HiOutlineUsers       size={20}/> },
  { key: 'coupons',   label: 'Coupons',    icon: <HiOutlineTag         size={20}/> },
];

export default function AdminDashboard() {
  const router   = useRouter();
  const [mode,     setMode]     = useState('light');
  const [active,   setActive]   = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(true);

  // Color shortcuts
  const bg      = mode === 'light' ? '#F9F5F5' : '#1A0A0D';
  const sideBg  = mode === 'light' ? '#FFFFFF'  : '#2A1218';
  const cardBg  = mode === 'light' ? '#FFFFFF'  : '#2A1218';
  const border  = mode === 'light' ? '#F0E8E8'  : '#4A2030';
  const textCol = mode === 'light' ? '#1A0A0D'  : '#FFFFFF';
  const muted   = mode === 'light' ? '#B0929A'  : '#8A6A72';
  const rowHov  = mode === 'light' ? '#FDF5F5'  : '#3A1820';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // ── Sidebar ──────────────────────────────────────────────
  const Sidebar = () => (
    <motion.div
      animate={{ width: sideOpen ? '220px' : '64px' }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: sideBg, borderRight: `1px solid ${border}`,
               height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100,
               display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Logo */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: `1px solid ${border}`,
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    minHeight: '64px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                      background: 'linear-gradient(135deg,#7A0019,#560012)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HiOutlineShoppingBag size={18} color="#fff"/>
        </div>
        {sideOpen && (
          <span style={{ fontWeight: '700', fontSize: '1rem', whiteSpace: 'nowrap',
                         color: textCol }}>
            <span style={{ color: '#7A0019' }}>MENS</span>WEAR
          </span>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.5rem', display: 'flex',
                    flexDirection: 'column', gap: '0.25rem' }}>
        {NAV.map(item => (
          <button key={item.key} onClick={() => setActive(item.key)}
            style={{ display: 'flex', alignItems: 'center',
                     gap: '0.75rem', padding: '0.65rem 0.75rem',
                     borderRadius: '10px', border: 'none', cursor: 'pointer',
                     backgroundColor: active === item.key ? '#7A0019' : 'transparent',
                     color: active === item.key ? '#fff' : muted,
                     fontWeight: active === item.key ? '600' : '400',
                     fontSize: '0.88rem', textAlign: 'left',
                     transition: 'all .2s', whiteSpace: 'nowrap' }}>
            {item.icon}
            {sideOpen && item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '0.75rem 0.5rem', borderTop: `1px solid ${border}` }}>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
                   padding: '0.65rem 0.75rem', borderRadius: '10px',
                   border: 'none', cursor: 'pointer', width: '100%',
                   backgroundColor: 'transparent', color: '#DC2626',
                   fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
          <HiOutlineLogout size={20}/>
          {sideOpen && 'Logout'}
        </button>
      </div>
    </motion.div>
  );

  // ── Topbar ───────────────────────────────────────────────
  const Topbar = () => (
    <div style={{ position: 'fixed', top: 0, right: 0,
                  left: sideOpen ? '220px' : '64px',
                  height: '64px', backgroundColor: cardBg,
                  borderBottom: `1px solid ${border}`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 1.5rem', zIndex: 99,
                  transition: 'left .3s' }}>
      <button onClick={() => setSideOpen(p => !p)}
        style={{ background: 'none', border: 'none', cursor: 'pointer',
                 color: textCol, display: 'flex' }}>
        {sideOpen ? <HiOutlineX size={22}/> : <HiOutlineMenu size={22}/>}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer',
                         color: muted, display: 'flex', position: 'relative' }}>
          <HiOutlineBell size={22}/>
          <span style={{ position: 'absolute', top: '-2px', right: '-2px',
                         width: '8px', height: '8px', borderRadius: '50%',
                         backgroundColor: '#7A0019' }}/>
        </button>
        <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
                   color: textCol, display: 'flex' }}>
          {mode === 'light' ? <HiOutlineMoon size={20}/> : <HiOutlineSun size={20}/>}
        </button>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#7A0019,#560012)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#fff',
                      fontSize: '0.85rem', fontWeight: '600' }}>
          A
        </div>
      </div>
    </div>
  );

  // ── Pages ────────────────────────────────────────────────
  const DashboardPage = () => (
    <div>
      <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.3rem',
                   fontWeight: '700', color: textCol }}>
        Welcome back, Admin 👋
      </h2>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                    gap: '1rem', marginBottom: '2rem' }}>
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ backgroundColor: cardBg, border: `1px solid ${border}`,
                     borderRadius: '14px', padding: '1.25rem',
                     boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
                          alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.78rem', color: muted }}>
                  {s.label}
                </p>
                <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: '700',
                            color: textCol }}>
                  {s.value}
                </p>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px',
                            backgroundColor: s.color + '18',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`,
                    borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${border}`,
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: textCol }}>
            Recent Orders
          </h3>
          <button onClick={() => setActive('orders')}
            style={{ background: 'none', border: 'none', color: '#7A0019',
                     fontSize: '0.82rem', cursor: 'pointer', fontWeight: '500' }}>
            View All
          </button>
        </div>
        <OrderTable />
      </div>
    </div>
  );

  const OrderTable = () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse',
                      fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ backgroundColor: mode === 'light' ? '#FDF5F5' : '#350F18' }}>
            {['Order ID','Customer','Product','Amount','Status','Action'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left',
                                   color: muted, fontWeight: '600',
                                   fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${border}`,
                                  transition: 'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = rowHov}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={{ padding: '0.85rem 1rem', color: '#7A0019', fontWeight: '600' }}>
                {o.id}
              </td>
              <td style={{ padding: '0.85rem 1rem', color: textCol }}>{o.customer}</td>
              <td style={{ padding: '0.85rem 1rem', color: textCol }}>{o.product}</td>
              <td style={{ padding: '0.85rem 1rem', color: textCol, fontWeight: '600' }}>
                {o.amount}
              </td>
              <td style={{ padding: '0.85rem 1rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px',
                               fontSize: '0.75rem', fontWeight: '600',
                               backgroundColor: STATUS_COLOR[o.status].bg,
                               color: STATUS_COLOR[o.status].color }}>
                  {o.status}
                </span>
              </td>
              <td style={{ padding: '0.85rem 1rem' }}>
                <button style={{ background: 'none', border: 'none',
                                 cursor: 'pointer', color: muted }}>
                  <HiOutlineEye size={18}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ProductsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700', color: textCol }}>
          Products
        </h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
                         padding: '0.6rem 1.1rem', borderRadius: '10px',
                         border: 'none', cursor: 'pointer',
                         background: 'linear-gradient(135deg,#7A0019,#560012)',
                         color: '#fff', fontSize: '0.85rem', fontWeight: '600' }}>
          <HiOutlinePlus size={17}/> Add Product
        </button>
      </div>
      <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`,
                    borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: mode === 'light' ? '#FDF5F5' : '#350F18' }}>
                {['ID','Name','Category','Price','Stock','Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left',
                                       color: muted, fontWeight: '600', fontSize: '0.78rem' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${border}` }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = rowHov}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '0.85rem 1rem', color: muted }}>{p.id}</td>
                  <td style={{ padding: '0.85rem 1rem', color: textCol, fontWeight: '500' }}>
                    {p.name}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: muted }}>{p.category}</td>
                  <td style={{ padding: '0.85rem 1rem', color: textCol, fontWeight: '600' }}>
                    {p.price}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ color: p.stock < 20 ? '#DC2626' : '#065F46',
                                   fontWeight: '600' }}>
                      {p.stock}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ background: 'none', border: 'none',
                                       cursor: 'pointer', color: '#1D4ED8' }}>
                        <HiOutlinePencil size={17}/>
                      </button>
                      <button style={{ background: 'none', border: 'none',
                                       cursor: 'pointer', color: '#DC2626' }}>
                        <HiOutlineTrash size={17}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PlaceholderPage = ({ title }) => (
    <div style={{ display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  height: '50vh', color: muted }}>
      <HiOutlineHome size={48} style={{ marginBottom: '1rem', opacity: 0.4 }}/>
      <h2 style={{ margin: 0, color: textCol }}>{title}</h2>
      <p style={{ fontSize: '0.88rem' }}>Coming soon...</p>
    </div>
  );

  const renderPage = () => {
    switch (active) {
      case 'dashboard': return <DashboardPage/>;
      case 'orders':    return (
        <div>
          <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.3rem',
                       fontWeight: '700', color: textCol }}>Orders</h2>
          <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`,
                        borderRadius: '14px', overflow: 'hidden' }}>
            <OrderTable/>
          </div>
        </div>
      );
      case 'products':  return <ProductsPage/>;
      case 'customers': return <PlaceholderPage title="Customers"/>;
      case 'coupons':   return <PlaceholderPage title="Coupons"/>;
      default:          return <DashboardPage/>;
    }
  };

  return (
    <div style={{ backgroundColor: bg, minHeight: '100vh',
                  fontFamily: 'sans-serif', color: textCol }}>
      <Sidebar/>
      <Topbar/>
      <main style={{ marginLeft: sideOpen ? '220px' : '64px',
                     paddingTop: '64px', transition: 'margin-left .3s' }}>
        <div style={{ padding: '1.75rem' }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}