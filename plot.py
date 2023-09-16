import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Define the data
data = {
    'Role': ["PLM Release & Compliance Officer", "Senior Technical Lead - DISW", "Senior Technical Lead", 
             "Technical Lead", "Delivery Compliance Manager (SENSYS)", "Applications Engineer"],
    'Company': ["Siemens", "Siemens Digital Industries Software", "Mentor Graphics", 
                "Mentor Graphics", "INTECH Automation & Intelligence", "Imperious Technology"],
    'Duration': ["14", "44", "15", "26", "58", "20"],
    'Skills' : [ "Technology Product Development", "Distributed Systems", "SCADA", "Docker Products",
    "Digital Asset Management", "Open-Source Software", "Predictive Analytics",
    "Amazon Web Services (AWS)", "Service Integration", "MindSphere"
[
  "Applications in IoT Cloud Device Management Domain": [
    "Device Provisioning and Onboarding",
    "Remote Device Configuration",
    "Firmware Updates and Over-the-Air (OTA) Updates",
    "Monitoring and Diagnostics",
    "Security and Access Control",
    "Scalability and Device Lifecycle Management",
    "Device Grouping and Tagging",
    "Alerts and Notifications",
    "Data Storage and Analytics",
    "Energy Management",
    "Asset Tracking and Inventory Management",
    "Predictive Maintenance",
    "Environmental Monitoring",
    "Smart Home and Building Automation",
    "Healthcare and Medical Devices"
  ],
],{
  "Applications in AI and ML Domain": {
    "Natural Language Processing (NLP)": {
      "Description": "NLP is used for understanding, interpreting, and generating human language text. Applications include chatbots, language translation, sentiment analysis, and text summarization."
    },
    "Computer Vision": {
      "Description": "Computer vision involves the use of AI and ML to interpret and analyze visual data from the real world. Applications include image recognition, object detection, facial recognition, and autonomous vehicles."
    },
    "Speech Recognition": {
      "Description": "Speech recognition technology converts spoken language into written text. It is used in voice assistants, transcription services, and voice-controlled systems."
    },
    "Recommendation Systems": {
      "Description": "These systems use ML algorithms to provide personalized product or content recommendations to users. Examples include recommendation engines on streaming platforms and e-commerce websites."
    },
    "Autonomous Systems": {
      "Description": "AI and ML are used to enable autonomous systems, such as self-driving cars, drones, and robots, to make decisions and navigate their environments without human intervention."
    },
    "Predictive Analytics": {
      "Description": "ML models are employed to make predictions based on historical data. This is used in finance for risk assessment, in healthcare for disease prediction, and in various industries for demand forecasting."
    },
    "Fraud Detection": {
      "Description": "AI and ML help identify fraudulent activities and transactions by analyzing patterns and anomalies in data. This is critical in financial services and cybersecurity."
    },
    "Healthcare Diagnostics": {
      "Description": "ML is used to assist in medical diagnoses, such as image analysis for radiology, pathology, and early disease detection."
    },
    "Natural Language Generation (NLG)": {
      "Description": "NLG involves generating human-like text based on structured data. It is used in automated report generation, content creation, and data storytelling."
    },
    "Chatbots and Virtual Assistants": {
      "Description": "AI-powered chatbots and virtual assistants provide automated customer support, answer questions, and perform tasks through natural language conversations."
    }
  }
},{
  "Applications of SCADA Systems": [
    {
      "Application": "Industrial Automation",
      "Description": "SCADA systems are used to control and monitor manufacturing processes, including production lines, chemical processes, and utilities such as water treatment and power generation."
    },
    {
      "Application": "Energy Management",
      "Description": "SCADA is employed in the energy sector to monitor and control the generation, distribution, and consumption of electricity and other energy resources, improving efficiency and reliability."
    },
    {
      "Application": "Utilities Management",
      "Description": "SCADA systems are crucial for managing water and wastewater treatment plants, natural gas distribution, and other utility systems by providing real-time data and control capabilities."
    },
    {
      "Application": "Transportation and Traffic Control",
      "Description": "SCADA helps manage traffic lights, railway systems, and transportation networks, optimizing traffic flow and ensuring safety."
    },
    {
      "Application": "Oil and Gas Industry",
      "Description": "SCADA systems are used in the oil and gas sector to monitor and control drilling operations, pipelines, and refining processes, enhancing safety and productivity."
    },
    {
      "Application": "Building Automation",
      "Description": "In commercial and residential buildings, SCADA is used for HVAC (heating, ventilation, and air conditioning) control, lighting management, and security systems."
    },
    {
      "Application": "Environmental Monitoring",
      "Description": "SCADA systems help monitor and manage environmental factors, including air quality, pollution control, and weather observation."
    },
    {
      "Application": "Manufacturing and Assembly",
      "Description": "SCADA systems improve efficiency in manufacturing and assembly lines, ensuring product quality, and optimizing production schedules."
    },
    {
      "Application": "Telecommunications",
      "Description": "SCADA plays a role in monitoring and managing telecommunications networks, including cell towers, to ensure network reliability."
    },
    {
      "Application": "Agriculture",
      "Description": "In agriculture, SCADA systems are used to monitor irrigation systems, livestock facilities, and crop storage, helping optimize farm operations."
    }
  ]
}

],
'Organizations':[    "System Level Engineering (SLE)",
     "Technology \& Innovation (TI)",
    "Process Quality Management  (TQM)",
     "Quality Assurance \& System Test  (QA)",
    "Embedded System Design (ESD)", 
     "Validation (VAL)",
     "Industrial Edge (IE)",
     "Project Management Office (PMO)",
     "Product Management Group (PMG)",
     "Field Test \& Deployment (FTD)",
     "Industrial AI Systems (AIS)",
     "Cloud Services Platform (CSP)",
     "Cloud Application Services (CAS)",
     "Autonomous Factory (AF)"],
'Projects':[
'Predictive analytics & real time condition monitoring for industrial asset through on-premise iot-gateway',
'IntelliMAX (Industrial Automation & HMI Software)',
'AI Application development frameowkr - enabled ML models training platform',
'CSP - Cloud Services Platform',
'Distributed Intelligence',
'IoT Device Management',
'M3 - Machine Monitoring & Management',
'OEE (Overall equipment efficiency)',
'OPC server & client compliance DA/HDA/AnE',
'PLC Alarming',
'Plant Assets Ontology ISA95',
'Plant Information Management System - SCADA Historian',
'Product security cyber threat & risk assessment - Cybersecurity',
'SCADA hot redundant Server & Client Switchover',
'Simulation Twin Lab',
'Transfer of Technology - JV'
]}

# Convert duration to numeric values
# data['Duration_numeric'] = pd.to_timedelta(data['Duration']).dt.total_seconds() / (3600 * 24 * 30.44)  # Convert to months
data['Duration_numeric'] = [14, 44, 15, 26, 58, 20]

# Create a color map for skills (for visualization)
# colors = plt.cm.Paired(np.arange(len(data['Role'])))

# Create the horizontal bar chart
plt.figure(figsize=(12, 6))
plt.barh(data['Role'], data['Duration_numeric'])
plt.xlabel('Duration (in months)')
plt.title('Muhammad FARHAN - Work Experience')
plt.gca().invert_yaxis()

# Add skills as text annotations
for i, (role, duration, company, skills) in enumerate(zip(data['Role'], data['Duration'], data['Company'], data['Skills'])):
    # plt.text(data['Duration_numeric'][i] + 0.5, i, f'{role}\n@ {company}\n({duration})', va='center', fontsize=6)
    plt.text(data['Duration_numeric'][i] + 0.5, i, f'{company}\n@ {duration})', va='center', fontsize=10)

# Add projects as text annotations
# for i, (project, duration, company) in enumerate(zip(data['Projects'], data['Duration'], data['Company'])):
#     plt.text(data['Duration_numeric'][i] + 0.5, i, f'{project}\n@ {company}\n({duration})', va='center', fontsize=10)

plt.tight_layout()
plt.show()
