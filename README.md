# 🧪 Physics Project - Arduino-based Captcha Generation System

## 📌 Overview

This project demonstrates a **hardware-software integration** system where an Arduino-based circuit generates CAPTCHA values, and a web interface validates them. The project combines **logic gates, Arduino hardware, and a web frontend** to create an interactive authentication system.

### 🎆 Key Achievement
This project was developed as part of the **Physics practical course** at VIT Chennai and showcases embedded systems integration with web technologies.

---

## 🎧 Project Components

### Hardware (Arduino-based)
- **Logic Gates Configuration**: Implementation of digital logic gates (AND, OR, NOT, XOR)
- **Arduino Board**: Controls the logic gate circuit
- **Output Module**: Generates CAPTCHA values
- **Serial Communication**: Sends captcha data to the web interface

### Software (Web Interface)
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask/Django)
- **Authentication**: Validates captchas received from hardware
- **Communication Protocol**: Serial/USB communication between Arduino and computer

---

## ✨ Features

- 💻 **Hardware Integration**: Direct connection between Arduino and web application
- 🔌 **Logic Gate Based**: Uses combinational logic to generate captchas
- 🔅 **Real-time Validation**: Captchas generated on hardware, validated on web
- 📱 **Web Interface**: Clean and intuitive login page with captcha verification
- 🔠 **Serial Communication**: Arduino communicates with web server via serial port

---

## 🛠️ Tech Stack

### Hardware
- **Microcontroller**: Arduino (Uno/Mega)
- **Logic Components**: Digital logic gates (TTL/CMOS ICs)
- **Communication**: Serial/USB interface

### Software
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask/Django) / Node.js
- **Serial Communication Library**: PySerial (Python) or similar
- **Database**: (if login credentials are stored)

---

## 👥 Team Members

Ishan Vaidya, PranavBharadwaj Nallanthigal, Gokula Krishnan N.S., Dipesh Raj S., Badri N Sahu, Ishan Shukla, Utsav, Arhaan, Arav

---

## 📂 Project Structure

```
Physics_Project_Ishan/
├── Hardware/
├──   ├── arduino_code.ino      # Arduino sketch
├──   ├── circuit_diagram.png   # Logic gate circuit
├──   └── components_list.txt
├── Frontend/
├──   ├── index.html            # Login page
├──   ├── style.css             # Styling
├──   └── script.js             # Client-side logic
├── Backend/
├──   ├── app.py                # Flask/Django app
├──   ├── serial_handler.py     # Arduino communication
├──   └── requirements.txt
└── README.md
```

---

## 🚀 How It Works

1. **Hardware Generation**: Arduino logic gates generate a random CAPTCHA value
2. **Serial Transmission**: Captcha is sent to the web server via serial communication
3. **User Interface**: Web page displays the captcha for the user
4. **Validation**: User enters the captcha, system validates against hardware-generated value
5. **Authentication**: Successful validation grants access

---

## 📤 Installation & Setup

### Hardware Setup
1. Build the logic gate circuit as per the circuit diagram
2. Connect to Arduino pins (specify pin connections in code)
3. Upload `arduino_code.ino` to the Arduino board

### Software Setup
```bash
# Clone or download the repository
cd Physics_Project_Ishan

# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
python app.py

# Open the frontend in a web browser
# Navigate to http://localhost:5000 (or specified port)
```

---

## 📊 Performance & Results

- Successful hardware-software integration
- Reliable CAPTCHA generation using logic gates
- Real-time validation with minimal latency
- Demonstrated at VIT Chennai Physics practical session

---

## 🔮 Future Enhancements

- Wireless communication (Bluetooth/WiFi instead of serial)
- More complex CAPTCHA patterns (image-based)
- Mobile app integration
- Multi-level security with encryption
- Real-time monitoring dashboard

---

## 📄 License

This is an academic project developed for VIT Chennai. Open to modification and improvement.

---

## 📂 References

- Arduino Documentation: https://www.arduino.cc/
- Digital Logic Circuits: Standard textbooks on Digital Electronics
- Flask Documentation: https://flask.palletsprojects.com/

---

## 📧 Contact

- **GitHub**: [ishanvaidya01](https://github.com/ishanvaidya01)
- **Email**: ishan.vaidya01@gmail.com
- **LinkedIn**: [Ishan Vaidya](https://linkedin.com/in/ishanvaidya-cse)
