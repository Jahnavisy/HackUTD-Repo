import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import FinanceCalculator from './FinanceCalculator';
import bgImage from './assets/Images/toyotalogo2.jpg';




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
  if (['/', '/quiz'].includes(location.pathname)) return null;

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  const handleGoogleSignIn = () => alert("Google Sign-In coming soon!");
  const handleForgotPassword = () => alert("Password reset instructions sent!");

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center -30%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#D6001C", marginBottom: "10px" }}>TOYOTA</h1>
        <h3 style={{ color: "#555", marginBottom: "25px" }}>Sign In</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={loginInputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={loginInputStyle}
          />
          <button type="submit" style={loginButtonStyle}>
            Sign In
          </button>
        </form>

        <p
          onClick={handleForgotPassword}
          style={{ color: "#D6001C", cursor: "pointer", fontSize: "14px", marginTop: "10px" }}
        >
          Forgot Password?
        </p>

        <div style={{ margin: "20px 0", borderTop: "1px solid #ddd", position: "relative" }}>
          <span
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0 10px",
              color: "#888",
              fontSize: "14px",
            }}
          >
            or
          </span>
        </div>

        <button onClick={handleGoogleSignIn} style={googleButtonStyle}>
          🔴 Sign in with Google
        </button>
      </div>
    </div>
  );
}


// ✅ Unique style variables to avoid conflicts
const loginInputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const loginButtonStyle = {
  width: "100%",
  backgroundColor: "#D6001C",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

const googleButtonStyle = {
  width: "100%",
  backgroundColor: "#fff",
  color: "#555",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};





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
  <label style={{ display:'block', marginBottom:5 }}>Price Range: ${form.budget || 10000}</label>
  <input
    type="range"
    name="budget"
    min="10000"
    max="100000"
    step="50"
    value={form.budget || 10000}
    onChange={handleChange}
    style={{ width:'100%' }}
  />
  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
    <span>$10000</span>
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
   },
   { id: 3,
     name: 'Sienna',
     img: 'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2024/rav4/218/1.png',
     price: '$40,120',
     eco: 'B',
     details: {
       seats: 7,
       primaryUse: 'Daily Commute',
       material: 'Leather',
       drive: 'Two Wheel Drive (TWD)',
       safety: 'Advanced Safety',
       entertainment: 'Standard Infotainment',
       horsepower: '245 HP',
       mpg: '34 city / 36 highway',
       cargo: '33.5 cu ft',
   }
  }
 ];


   return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#D6001C", marginBottom: 20 }}>Recommended Vehicles</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              ...cardStyle,
              border: "2px solid black", // Outline in black
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={car.img}
                alt={car.name}
                style={{ width: "120px", borderRadius: 12 }}
              />
              <div>
                <h3>{car.name}</h3>
                <p>Price: {car.price}</p>
                <p>Eco Score: {car.eco}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/car/${car.id}`, { state: { car } })}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#D6001C",
              }}
            >
              ➡️
            </button>
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
// Compare Screen
// Compare Screen
function Compare() {
  const navigate = useNavigate();

  // Same cars data as Recommendations
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
        drive: 'Two Wheel Drive (TWD)',
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
      <h2 style={{ color: '#D6001C', marginBottom: 20 }}>Compare Vehicles</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              ...cardStyle,
              border: '1px solid black',
              flex: '1 1 45%',
              position: 'relative',
            }}
          >
            <img src={car.img} alt={car.name} style={{ width: '100%', borderRadius: 12 }} />
            <h3>{car.name}</h3>
            <p><strong>Price:</strong> {car.price}</p>
            <p><strong>Eco Score:</strong> {car.eco}</p>
            <p><strong>Seats:</strong> {car.details.seats}</p>
            <p><strong>Primary Use:</strong> {car.details.primaryUse}</p>
            <p><strong>Seat Material:</strong> {car.details.material}</p>
            <p><strong>Drive Type:</strong> {car.details.drive}</p>
            <p><strong>Safety Priority:</strong> {car.details.safety}</p>
            <p><strong>Entertainment Features:</strong> {car.details.entertainment}</p>
            <p><strong>Horsepower:</strong> {car.details.horsepower}</p>
            <p><strong>MPG:</strong> {car.details.mpg}</p>
            <p><strong>Cargo Space:</strong> {car.details.cargo}</p>

            {/* Arrow button to go to details */}
            <button
              onClick={() => navigate(`/car/${car.id}`, { state: { car } })}
              style={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                backgroundColor: '#D6001C',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              ➔
            </button>
          </div>
        ))}
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
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#D6001C', marginBottom: 20 }}>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {cart.map((car, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <img src={car.img} alt={car.name} style={{ width: 80, borderRadius: 8 }} />
              <div>
                <h3>{car.name}</h3>
                <p>Price: {car.price}</p>
              </div>
              {/* ✅ Reserve button for THIS specific car */}
              <button
                style={{ ...buttonStyle, backgroundColor: '#28a745', marginLeft: 'auto' }}
                onClick={() => navigate('/reserve', { state: { car } })}
              >
                Reserve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// Reservation Screen
// Reservation Screen
function Reservation() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car; // ✅ safely get car from state

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationInput, setLocationInput] = useState('');

  if (!car) {
    return <p>No car selected. Go back to your cart.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation submitted for ${car.name}!\nA confirmation email will be sent to your email.\nDate: ${date}\nTime: ${time}\nLocation: ${locationInput}`);
    navigate('/recommendations'); // Optional: navigate back after reservation
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#D6001C', marginBottom: 20 }}>Reserve {car.name}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15, maxWidth: 400 }}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required style={inputStyle} />
        </label>
        <label>
          Location:
          <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} placeholder="Enter location" required style={inputStyle} />
        </label>
        <button type="submit" style={buttonStyle}>Submit Reservation</button>
      </form>
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
            <Route path="/reserve" element={<Reservation />} />
            <Route path="/cart" element={<Cart />} />
            
          </Routes>
          <Navbar />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}


export default App;

