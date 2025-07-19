const projectsData = [
    {
        id: 1,
        title: "Medical Laboratory Analysis",
        description: "Design the data warehouse schema and optimize ETL pipelines using SSMS and SSIS. Develop OLAP cubes using SSAS. Implement aggregation, calculated measures, KPIs and build a dashboard with Power BI.",
        technologies: ["SSMS", "SSIS", "SSAS", "Power BI", "SQL Server", "OLAP", "ETL"],
        icon: "🏥",
        color: "#E74C3C",
        category: "Data Engineering"
    },
    {
        id: 2,
        title: "PDF-based RAG Chatbot",
        description: "Built a RAG system using ChromaDB for PDF storage and retrieval. Used Ollama to load an LLM for generating responses from PDF content. Created a Gradio UI for easy PDF uploads and querying.",
        technologies: ["ChromaDB", "Ollama", "LLM", "Gradio", "RAG", "Python", "NLP"],
        icon: "💬",
        color: "#3498DB",
        category: "AI/ML"
    },
    {
        id: 3,
        title: "Web Application for Sentiment Analysis",
        description: "Collected user comments through web scraping using Selenium and stored them in MongoDB. Preprocessed data and trained deep learning models and Transformer models for sentiment classification. Developed a web application with Flask.",
        technologies: ["Selenium", "MongoDB", "Flask", "Deep Learning", "Transformers", "NLP", "Web Scraping"],
        icon: "😊",
        color: "#9B59B6",
        category: "Web Development"
    },
    {
        id: 4,
        title: "Recommendation System for Research Articles",
        description: "Collected research papers by performing web scraping from Scopus, Web of Science, and Google Scholar. Built a recommendation system using content-based and collaborative filtering techniques. Developed a Flask-based web application.",
        technologies: ["Web Scraping", "Scopus API", "Flask", "Content-Based Filtering", "Collaborative Filtering", "NLP", "Python"],
        icon: "📚",
        color: "#F39C12",
        category: "Recommendation Systems"
    },
    {
        id: 5,
        title: "Land-use Scene Classification",
        description: "Used Kafka to simulate real-time streaming for getting satellite images for land-scenes. Preprocessed images with PySpark and trained ML models with SparkMLlib. Built Streamlit app for land-scene classification.",
        technologies: ["Kafka", "PySpark", "SparkMLlib", "Streamlit", "Computer Vision", "Real-time Processing", "Satellite Imagery"],
        icon: "🛰️",
        color: "#27AE60",
        category: "Computer Vision"
    },
    {
        id: 6,
        title: "License Plate Detection and Recognition",
        description: "Detected license plates in vehicle images. Preprocessed detected regions to prepare them for text recognition. Applied Tesseract OCR to recognize and extract alphanumeric plate numbers.",
        technologies: ["Computer Vision", "Tesseract OCR", "OpenCV", "Image Processing", "Python", "Object Detection"],
        icon: "🚗",
        color: "#E67E22",
        category: "Computer Vision"
    }
];

export default projectsData;