import React from 'react';

const styles = {
  pageContainer: {
    padding: '50px',
    backgroundColor: '#FFFFFF',
    borderRadius: '1px',
    maxWidth: '100%',
    margin: '5px auto',
  },
  lostFoundHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '20px',
  },
  reportButton: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-70%)',
    background: '#1851ccff',
    color: '#fff',
    border: 'none',
    padding: '15px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '16px',
    transition: '0.3s',
  },
  reportButtonHover:'#19af7dff',
  title: {
    color: '#374151',
    fontSize: '75px',
    fontWeight: 'bold',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '25px',
    marginTop: '10px',
  },
  searchAndFilters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
  },
  searchBar: {
    position: 'relative',
    width: '800px',
    maxWidth: '90%',
    marginBottom: '30px',
  },
  searchInput: {
    width: '100%',
    padding: '20px 20px 10px 40px',
    border: '1px solid #e5e7eb',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  searchIcon: {
    position: 'absolute',
    top: '40%',
    left: '15px',
    transform: 'translateY(-50%)',
    color: '#6b7280',
  },
  filterButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
  },
  filterButton: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    color: '#6b7280',
    padding: '10px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.3s, color 0.3s',
    display: 'flex',
    alignItems: 'center',
  },
  filterButtonActive: {
    background: '#10b981',
    color: '#fff',
    borderColor: '#3ea087ff',
  },
  lostFoundCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },
  card: {
    background: 'linear-gradient(to right, #9db8f0ff, #92eecfff)',
    border: '1px solid #ddd',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '5px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
    transition: 'transform 0.3s',
  },
  cardHover: { transform: 'translateY(-10px)' },
  cardIcon: { fontSize: '4rem', color: '#2173c4ff' },
  cardContentTitle: { margin: 0, gap: '20px', fontSize: '25px', color: '#0b1f3a' },
  status: {
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '5px 15px',
    borderRadius: '10px',
    display: 'inline-block',
    margin: '5px 0',
  },
  lost: { backgroundColor: '#f8d7da', color: '#721c24' },
  found: { backgroundColor: '#d4edda', color: '#155724' },
  claimed: { backgroundColor: '#fff3cd', color: '#856404' },
  details: { fontSize: '14px', color: '#555', margin: '5px 0' },
  viewDetailsButton: {
    width: '100%',
    backgroundColor: '#1474daff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 600,
    marginTop: '15px',
    transition: 'background-color 0.3s',
  },
  viewDetailsButtonHover: '#0b3f77ff' ,
};

const LostFound = () => {
  const items = [
    { id: 1, title: 'Blue Backpack', category: 'Bags', status: 'Lost', location: 'Main Library - 2nd Floor', date: '1/14/2024', description: 'Navy blue Jansport backpack with laptop compartment', icon: 'fas fa-briefcase' },
    { id: 2, title: 'iPhone 13 Pro', category: 'Electronics', status: 'Found', location: 'Student Center - Cafeteria', date: '1/13/2024', description: 'Black iPhone 13 Pro with cracked screen protector', icon: 'fas fa-mobile-alt' },
    { id: 3, title: 'Car Keys', category: 'Keys', status: 'Lost', location: 'Engineering Building - Parking Lot', date: '1/12/2024', description: 'Honda key with red keychain and student ID card', icon: 'fas fa-key' },
    { id: 4, title: 'Gold Bracelet', category: 'Jewelry', status: 'Claimed', location: 'Sports Complex - Locker Room', date: '1/10/2024', description: 'Thin gold bracelet with small charm', icon: 'fas fa-gem' },
    { id: 5, title: 'Textbook - Physics 101', category: 'Books', status: 'Found', location: 'Main Library - Study Area', date: '1/10/2024', description: 'Used physics textbook with yellow highlighting', icon: 'fas fa-book' },
    { id: 6, title: 'Prescription Glasses', category: 'Personal', status: 'Lost', location: 'Main Library - Study Area', date: '1/10/2024', description: 'Black frame prescription glasses in brown case', icon: 'fas fa-glasses' },
  ];

  return (
    <section style={styles.pageContainer}>
      <div style={styles.lostFoundHeader}>
        <h1 style={styles.title}>Lost & Found</h1>
        <p style={styles.subtitle}>Report lost items or help others find their belongings</p>
        <button style={styles.reportButton}>+ Report Item</button>
      </div>

      <div style={styles.searchAndFilters}>
        <div style={styles.searchBar}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search lost items..." style={styles.searchInput} />
        </div>
        <div style={styles.filterButtons}>
          {['All','Bags','Electronics','Keys','Jewelry','Books','Personal'].map((filter, idx) => (
            <button key={idx} style={styles.filterButton}>{filter}</button>
          ))}
        </div>
      </div>

      <div style={styles.lostFoundCardsGrid}>
        {items.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardIcon}><i className={item.icon}></i></div>
            <div>
              <h3 style={styles.cardContentTitle}>{item.title}</h3>
              <p>{item.category}</p>
              <p style={{...styles.status, ...(item.status.toLowerCase() === 'lost' ? styles.lost : item.status.toLowerCase() === 'found' ? styles.found : styles.claimed)}}>
                {item.status}
              </p>
              <p style={styles.details}>{item.description}</p>
              <p style={styles.details}><strong>Location:</strong> {item.location}</p>
              <p style={styles.details}><strong>Date:</strong> {item.date}</p>
            </div>
            <button style={styles.viewDetailsButton}>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LostFound;
