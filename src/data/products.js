const products = [
  {
    id: 1,
    name: "Arduino Robot Kit",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1576045020206-463045031b60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Complete kit for building your first Arduino robot with sensors and actuators",
    rating: 4.8,
    category: "Arduino"
  },
  {
    id: 2,
    name: "ESP32 AI Kit",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1550009158-9eb4072d190c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Advanced ESP32 development board with AI capabilities for smart projects",
    rating: 4.9,
    category: "ESP32"
  },
  {
    id: 3,
    name: "Raspberry Pi 4 Robot",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1545231205-4d113f787c9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Raspberry Pi powered robot with camera and computer vision capabilities",
    rating: 4.7,
    category: "Robotics"
  },
  {
    id: 4,
    name: "Sensor Array Pack",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1518770660439-463619030f30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Complete set of sensors for environmental monitoring and robotics",
    rating: 4.6,
    category: "Sensors"
  },
  {
    id: 5,
    name: "AI Vision Kit",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Computer vision kit with camera and AI processing unit for object recognition",
    rating: 4.9,
    category: "AI Kits"
  },
  {
    id: 6,
    name: "Quadcopter Drone Kit",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1507146426996-ef0530099709?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Build your own quadcopter drone with GPS and camera capabilities",
    rating: 4.8,
    category: "Robotics"
  },
  {
    id: 7,
    name: "IoT Home Automation Kit",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae6b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Complete home automation system with sensors and smart devices",
    rating: 4.7,
    category: "AI & IoT"
  },
  {
    id: 8,
    name: "Robotic Arm Controller",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Precision robotic arm with 6-axis control and programming interface",
    rating: 4.9,
    category: "Robotics"
  },
  {
    id: 9,
    name: "Arduino Sensor Kit",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518773556940-729851129d2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Complete set of 37 sensors for Arduino projects",
    rating: 4.6,
    category: "Sensors"
  },
  {
    id: 10,
    name: "ESP32 Development Board",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1550009158-9eb4072d190c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "ESP32 development board with Wi-Fi and Bluetooth capabilities",
    rating: 4.8,
    category: "ESP32"
  },
  {
    id: 11,
    name: "Raspberry Pi Camera Module",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1546406444-4876e0f1918b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "High-quality camera module for Raspberry Pi projects",
    rating: 4.7,
    category: "Sensors"
  },
  {
    id: 12,
    name: "AI Learning Kit",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Complete AI learning kit with tutorials and projects",
    rating: 4.9,
    category: "AI Kits"
  }
];

export default products;