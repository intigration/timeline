import matplotlib.pyplot as plt

# Define the skills and their frequencies
skills = [
    "Technology Product Development", "Agile \& Scrum","PLM Management","Distributed Systems", "SCADA", 
    "Risk assesment \& mitgation","Docker Products", "Kubernates",    "Digital Asset Management", "Open-Source Software", "Predictive Analytics",
    "Data Engineering and Big Data","Version Control Management",
    "Amazon Web Services (AWS)", "DevOps and Automation", "QA \& Testing",
    "Virtualization","Simulation","IoT & Edge Device Management"
    "Artificial Intelligence (AI) and Machine Learning (ML)",
    "Cloud Computing","Programming Languages", "CyberSecurity" 
]
skill_frequencies = [2, 2, 1, 3, 1, 3, 2, 1, 1, 1]  # You can adjust the frequencies as needed

# Create a horizontal bar chart
plt.figure(figsize=(10, 6))
plt.barh(skills, skill_frequencies, color='skyblue')
plt.xlabel('Frequency')
plt.title('Skills in Predictive Analytics & Real-time Condition Monitoring')
plt.gca().invert_yaxis()  # Invert the y-axis to display skills from top to bottom

# Add skill frequency values on top of the bars
for i, v in enumerate(skill_frequencies):
    plt.text(v + 0.1, i, str(v), va='center', fontsize=10, color='black')

plt.tight_layout()
plt.show()
# Add skills as text annotations
