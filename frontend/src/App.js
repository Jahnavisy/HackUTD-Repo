
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import FinanceCalculator from './FinanceCalculator';
import React, { useState, createContext, useContext } from 'react';

// Create context
const CartContext = createContext();

// Provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (car) => setCart((prev) => [...prev, car]);
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart
export function useCart() {
  return useContext(CartContext);
}



// Navbar Component
function Navbar() {
  const location = useLocation();
  if (['/', '/quiz', '/ai-agent'].includes(location.pathname)) return null;

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        backgroundColor: '#fff',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 1000,
      }}
    >
      <Link to="/recommendations" style={{ color: '#D6001C', fontWeight: 'bold' }}>
        Home
      </Link>
      <Link to="/compare" style={{ color: '#D6001C', fontWeight: 'bold' }}>
        Compare
      </Link>
      <Link to="/finance" style={{ color: '#D6001C', fontWeight: 'bold' }}>
        Finance
      </Link>
      <Link to="/ai-agent" style={{ color: '#D6001C', fontWeight: 'bold' }}>
        AI Agent
        </Link>
        <Link to="/Cart" style={{ color: '#D6001C', fontWeight: 'bold' }}>
        Cart
</Link>
    </nav>
  );
}

// Login Screen
function Login() {
  const navigate = useNavigate();
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'50px 20px' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.png" alt="Toyota Logo" style={{ width: 120, marginBottom: 40 }} />
      <h2 style={{ color:'#D6001C', marginBottom:20 }}>Welcome to Toyota AutoAdvisor</h2>
      <input placeholder="Email" type="email" style={inputStyle} />
      <input placeholder="Password" type="password" style={inputStyle} />
      <button style={buttonStyle} onClick={()=>navigate('/quiz')}>Login</button>
      <button style={{ ...buttonStyle, backgroundColor:'#fff', color:'#D6001C', border:'1px solid #D6001C' }}>Continue with Google</button>
      <p style={{ marginTop:20 }}>Don't have an account? Sign up</p>
    </div>
  );
}

// Quiz Screen
function Quiz() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    budget: '', 
    seats: '', 
    fuel: '',
    primaryUse: '',
    material: '',
    drive: '',
    safety: '',
    eco: '',
    entertainment: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log('User Preferences:', form); // optional: see selections in console
    navigate('/recommendations');
  };

  return (
    <div style={{ padding:'20px' }}>
      <h2 style={{ color:'#D6001C', marginBottom:20 }}>Tell us about your preferences</h2>

      <div style={{ marginBottom:20 }}>
  <label style={{ display:'block', marginBottom:5 }}>Price Range: ${form.budget || 20000}</label>
  <input
    type="range"
    name="budget"
    min="20000"
    max="100000"
    step="50"
    value={form.budget || 20000}
    onChange={handleChange}
    style={{ width:'100%' }}
  />
  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
    <span>$20000</span>
    <span>$100000</span>
  </div>
</div>


      <select name="seats" onChange={handleChange} style={selectStyle}>
        <option value="">Seating Capacity</option>
        <option>2</option>
        <option>4</option>
        <option>5</option>
        <option>7</option>
      </select>

      <select name="fuel" onChange={handleChange} style={selectStyle}>
        <option value="">Fuel Type</option>
        <option>Petrol</option>
        <option>Hybrid</option>
        <option>Electric</option>
      </select>

      <select name="primaryUse" onChange={handleChange} style={selectStyle}>
        <option value="">Primary Use</option>
        <option>Daily Commute</option>
        <option>Family</option>
        <option>Adventure</option>
        <option>Eco-Friendly</option>
      </select>

      <select name="material" onChange={handleChange} style={selectStyle}>
        <option value="">Seat Material</option>
        <option>Cloth</option>
        <option>Leather</option>
        <option>Synthetic Leather</option>
        <option>Any</option>
      </select>

      <select name="color" onChange={handleChange} style={selectStyle}>
        <option value="">Color Choice</option>
        <option>Super White</option>
        <option>Blizzard Pearl</option>
        <option>Magnetic Gray Metallic</option>
        <option>Ruby Flare Pearl</option>
        <option>Midnight Black Metallic</option>
      </select>

      <select name="drive" onChange={handleChange} style={selectStyle}>
       <option value="">Drive Type</option>
       <option>Front Wheel Drive (FWD)</option>
       <option>Rear Wheel Drive (RWD)</option>
       <option>All Wheel Drive (AWD)</option>
       <option>Four Wheel Drive (4WD)</option>
       <option>Two Wheel Drive (2WD)</option>
     </select>


      <select name="safety" onChange={handleChange} style={selectStyle}>
        <option value="">Safety Priority</option>
        <option>Standard Safety</option>
        <option>Advanced Safety</option>
        <option>Premium Safety</option>
      </select>

      <select name="entertainment" onChange={handleChange} style={selectStyle}>
        <option value="">Entertainment Features</option>
        <option>Basic Audio System</option>
        <option>Standard Infotainment</option>
        <option>Premium Sound & Display</option>
      </select>

      <button style={buttonStyle} onClick={handleSubmit}>Generate Recommendations</button>
    </div>
  );
}

// Recommendations Screen
function Recommendations() {
 const navigate = useNavigate();


 // Basic car data (cleaner for this screen)
 const cars = [
   {
     id: 1,
     name: 'Grand Highlander',
     img: 'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2024/camry/3T3/1.png',
     price: '$41,360',
     eco: 'A',
     details: {
       seats: 7,
       primaryUse: 'Daily Commute',
       material: 'Leather',
       drive: 'Two Wheel Drive (TWD)',
       safety: 'Advanced Safety',
       entertainment: 'Standard Infotainment',
       horsepower: '203 HP',
       mpg: '28 city / 39 highway',
       cargo: '15.1 cu ft',
     }
   },
   {
     id: 2,
     name: '4Runner',
     img: 'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2024/rav4/218/1.png',
     price: '$41,270',
     eco: 'B',
     details: {
       seats: 7,
       primaryUse: 'Daily Commute',
       material: 'Leather',
       drive: 'Two Wheel Drive (TWD',
       safety: 'Advanced Safety',
       entertainment: 'Standard Infotainment',
       horsepower: '203 HP',
       mpg: '27 city / 35 highway',
       cargo: '37.6 cu ft',
     }
   }
 ];


  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#D6001C', marginBottom: 20 }}>Recommended Vehicles</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cars.map((car) => (
          <div
            key={car.id}
            style={{ ...cardStyle, cursor: 'pointer' }}
            onClick={() => navigate(`/car/${car.id}`, { state: { car } })}
          >
            <img src={car.img} alt={car.name} style={{ width: '100%', borderRadius: 12 }} />
            <h3>{car.name}</h3>
            <p>Price: {car.price}</p>
            <p>Monthly Estimate: {car.monthly}</p>
            <p>Eco Score: {car.eco}</p>
            <p style={{ color: '#D6001C', fontWeight: 'bold' }}>Click for more details</p>
          </div>
        ))}
      </div>
    </div>
  );
}

//car details
function CarDetails() {
  const { id } = useParams();
  const location = useLocation();
  const car = location.state?.car;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!car) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#D6001C' }}>Car not found</h2>
        <p>Go back to recommendations.</p>
      </div>
    );
  }

  const details = car.details;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#D6001C' }}>{car.name}</h2>
      <img
        src={car.img}
        alt={car.name}
        style={{ width: '100%', borderRadius: 12, marginBottom: 20 }}
      />

      <h3>Key Specifications</h3>
      <ul>
        <li><strong>Seats:</strong> {details.seats}</li>
        <li><strong>Primary Use:</strong> {details.primaryUse}</li>
        <li><strong>Seat Material:</strong> {details.material}</li>
        <li><strong>Drive Type:</strong> {details.drive}</li>
        <li><strong>Safety Priority:</strong> {details.safety}</li>
        <li><strong>Entertainment Features:</strong> {details.entertainment}</li>
        <li><strong>Horsepower:</strong> {details.horsepower}</li>
        <li><strong>MPG:</strong> {details.mpg}</li>
        <li><strong>Cargo Space:</strong> {details.cargo}</li>
      </ul>

      <div style={{ marginTop: 20 }}>
        <h3>Depreciation Graph</h3>
        <div style={{ width: '100%', height: 150, background: '#eee', borderRadius: 12 }}></div>
      </div>

      <div style={{ marginTop: 20 }}>
  <h3>Maintenance Estimate</h3>
  <p>$500/year</p>
</div>

<div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
  <button
    style={{ ...smallButtonStyle, marginRight: 10 }}
    onClick={() => navigate('/ai-agent', { state: { car } })}
  >
    Ask me about this car
  </button>

  <button
    style={addToCartButtonStyle}
    onClick={() => {
      addToCart(car);       // Add car to global cart
      navigate('/cart'); // Navigate to cart tab
    }}
  >
    Add to Cart
  </button>
</div>
    </div>
  );
}
// Compare Screen
function Compare() {
  return (
    <div style={{ padding:'20px' }}>
      <h2 style={{ color:'#D6001C' }}>Compare Vehicles</h2>
      <div style={{ display:'flex', gap:'10px' }}>
        <div style={cardStyle}>
          <h3>Toyota Camry</h3>
          <p>Price: $30k</p>
          <p>MPG: 28/39</p>
          <p>Horsepower: 203</p>
          <p>Safety Rating: 5</p>
        </div>
        <div style={cardStyle}>
          <h3>Toyota RAV4</h3>
          <p>Price: $35k</p>
          <p>MPG: 27/35</p>
          <p>Horsepower: 203</p>
          <p>Safety Rating: 5</p>
        </div>
      </div>
    </div>
  );
}

// AI Agent Screen
function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { text: input, from:'user' }, { text:'Placeholder AI response', from:'ai' }]);
    setInput('');
  };

  return (
    <div style={{ padding:'20px' }}>
      <h2 style={{ color:'#D6001C' }}>AI Voice Agent</h2>
      <div style={{ maxHeight:400, overflowY:'scroll', marginBottom:20, display:'flex', flexDirection:'column' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.from==='user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.from==='user' ? '#D6001C' : '#eee',
            color: msg.from==='user' ? '#fff' : '#000',
            padding:'10px', borderRadius:12, margin:'5px 0', maxWidth:'70%'
          }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:10 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask me something..." style={{ flex:1, padding:10, borderRadius:8, border:'1px solid #ccc' }} />
        <button onClick={sendMessage} style={{ padding:'10px 15px', borderRadius:8, backgroundColor:'#D6001C', color:'#fff', border:'none' }}>Send</button>
      </div>
    </div>
  );
}


// check
function Cart() {
  const { cart } = useCart();

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#D6001C', marginBottom: 20 }}>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {cart.map((car, idx) => (
            <div key={idx} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={car.img} alt={car.name} style={{ width: 80, borderRadius: 8 }} />
              <div>
                <h3>{car.name}</h3>
                <p>Price: {car.price}</p>
              </div>
            </div>
          ))}
          <button style={{ ...buttonStyle, backgroundColor: '#28a745' }}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}


// Styles
const inputStyle = { padding:'10px', margin:'10px 0', width:'80%', borderRadius:8, border:'1px solid #ccc', fontSize:16 };
const buttonStyle = { padding:'12px', marginTop:10, width:'85%', borderRadius:12, border:'none', backgroundColor:'#D6001C', color:'#fff', fontSize:16, cursor:'pointer' };
const smallButtonStyle = { padding: '8px 12px', borderRadius: 8, border: 'none', backgroundColor: '#D6001C', color: '#fff', fontSize: 14, cursor: 'pointer' };

// ✅ New Add to Cart style
const addToCartButtonStyle = { 
  ...smallButtonStyle,      // inherit small button base style
  backgroundColor: '#d6001c' // red
};

const selectStyle = { display:'block', width:'100%', padding:'10px', margin:'10px 0', borderRadius:8, fontSize:16 };
const cardStyle = { flex:1, padding:15, borderRadius:12, boxShadow:'0 2px 8px rgba(0,0,0,0.1)', backgroundColor:'#fff' };


// Main App
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh', paddingBottom:60 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/finance" element={<FinanceCalculator />} />
            <Route path="/ai-agent" element={<AIAgent />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Navbar />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}


export default App;

