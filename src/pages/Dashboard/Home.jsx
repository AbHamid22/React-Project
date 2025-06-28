import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        padding: '40px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <img 
            src="assets/img/real_estate.png" 
            alt="Real Estate Logo" 
            style={{
              width: '80px',
              height: '80px',
              marginRight: '15px',
              borderRadius: '10px'
            }}
          />
          <div>
            <h1 style={{
              color: '#2c3e50',
              fontSize: '2.5rem',
              marginBottom: '10px',
              fontWeight: '700',
              margin: '0'
            }}>REC&M</h1>
            <p style={{
              color: '#7f8c8d',
              fontSize: '1.2rem',
              margin: '0'
            }}>Real Estate Construction & Management System</p>
          </div>
        </div>
        <p style={{
          color: '#7f8c8d',
          fontSize: '1.1rem',
          margin: '0'
        }}>Comprehensive solution for managing properties, projects, purchases, and financial operations</p>
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        marginTop: '30px'
      }}>
        {/* Property Management */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏠</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '15px' }}>Property Management</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px', lineHeight: '1.6' }}>
            Manage all your real estate properties with detailed information, photos, and status tracking.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <NavLink to="/all-property" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>View Properties</NavLink>
            <NavLink to="/create-property" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Add Property</NavLink>
          </div>
        </div>

        {/* Project Management */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏗️</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '15px' }}>Project Management</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px', lineHeight: '1.6' }}>
            Track construction projects, timelines, budgets, and progress with comprehensive project management tools.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <NavLink to="/all-project" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>View Projects</NavLink>
            <NavLink to="/create-project" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Create Project</NavLink>
          </div>
        </div>

        {/* Purchase Management */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🛒</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '15px' }}>Purchase Management</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px', lineHeight: '1.6' }}>
            Manage purchase orders, track vendors, and monitor inventory with detailed purchase tracking.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <NavLink to="/all-purchase" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>View Purchases</NavLink>
            <NavLink to="/create-purchase" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Create Purchase</NavLink>
          </div>
        </div>

        {/* Financial Management */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💰</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '15px' }}>Financial Management</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px', lineHeight: '1.6' }}>
            Handle invoices, payments, and financial records with comprehensive accounting features.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <NavLink to="/create-invoice" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Create Invoice</NavLink>
            <NavLink to="/manage-invoice" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Manage Invoices</NavLink>
          </div>
        </div>

        {/* Payment Tracking */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💳</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '15px' }}>Payment Tracking</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px', lineHeight: '1.6' }}>
            Track all payments, manage MR (Money Receipt) records, and maintain financial transparency.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <NavLink to="/create-mr" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Create Payment</NavLink>
            <NavLink to="/manage-mr" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>Manage Payments</NavLink>
          </div>
        </div>

        {/* Dashboard & Analytics */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '15px' }}>Dashboard & Analytics</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px', lineHeight: '1.6' }}>
            Get comprehensive insights with detailed dashboards and analytics for better decision making.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <NavLink to="/dashboard" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '500'
            }}>View Dashboard</NavLink>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        padding: '30px',
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>System Overview</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>50+</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Properties Managed</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>25+</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Active Projects</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>100+</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Purchase Orders</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>500+</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Invoices Generated</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;