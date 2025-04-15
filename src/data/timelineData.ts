export interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  icon?: string;
  type: 'experience' | 'project';
  parentExperience?: string;
  achievements?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    date: "Jan. 2024 - Heute",
    title: "Data Engineer & Projektmanager",
    subtitle: "PromoData GmbH",
    description: "Entwicklung und Management von Datenarchitekturen und Cloud-Infrastrukturen",
    technologies: ["Python", "SQL", "Airbyte", "Airflow", "Docker", "MinIO", "Hive", "Superset", "Power BI", "Microsoft Dynamics", "SharePoint", "Teams"],
    type: "experience",
    achievements: [
      "Aufbau eines modernen Data Lakehouse mit Open-Source Technologien",
      "Migration von Jira On-Prem zu Atlassian Cloud mit Assets (CMDB)",
      "Einführung von Microsoft Teams als VoIP- und Collaboration-Tool"
    ]
  },
  {
    date: "Jan. 2024 - Heute",
    title: "Einführung ERP-System",
    description: "Evaluation, Workshops und Auswahl eines neuen ERP-Systems (Microsoft Dynamics Business Central)",
    technologies: ["Microsoft Dynamics", "ERP", "Workshop Management"],
    type: "project",
    parentExperience: "Data Engineer & Projektmanager"
  },
  {
    date: "Jan. 2024 - Heute",
    title: "Markteinführung YNEW",
    description: "Aufbau einer nachhaltigen IT-Marke inkl. Shop, Logistikprozesse, Multishop-Lösung & Buchhaltungsanbindung",
    technologies: ["Shopify", "Logistik", "Buchhaltung", "Multishop"],
    type: "project",
    parentExperience: "Data Engineer & Projektmanager"
  },
  {
    date: "Jan. 2024 - Heute",
    title: "Aufbau Data Lakehouse",
    description: "Implementierung eines Open-Source Data Lakehouse (Airbyte, Airflow, MinIO, Hive, Superset, Power BI)",
    technologies: ["Airbyte", "Airflow", "MinIO", "Hive", "Superset", "Power BI", "Data Lakehouse"],
    type: "project",
    parentExperience: "Data Engineer & Projektmanager"
  },
  {
    date: "Jan. 2024 - Heute",
    title: "Migration Jira Cloud",
    description: "Umstellung von Jira On-Prem auf Atlassian Cloud inkl. Assets (CMDB)",
    technologies: ["Jira", "Atlassian Cloud", "Assets", "CMDB", "Migration"],
    type: "project",
    parentExperience: "Data Engineer & Projektmanager"
  },
  {
    date: "Jan. 2024 - Heute",
    title: "Migration Tresorit zu SharePoint",
    description: "Datenmigration & Ablösung des alten Cloud-Speichers",
    technologies: ["SharePoint", "Data Migration", "Cloud Storage"],
    type: "project",
    parentExperience: "Data Engineer & Projektmanager"
  },
  {
    date: "Jan. 2024 - Heute",
    title: "Teams-VoIP-Einführung",
    description: "Planung und Einführung von Microsoft Teams als VoIP- und Collaboration-Tool",
    technologies: ["Microsoft Teams", "VoIP", "Collaboration"],
    type: "project",
    parentExperience: "Data Engineer & Projektmanager"
  },
  {
    date: "2022 - Heute",
    title: "Data Engineer & IT-Consultant",
    subtitle: "Freelancer",
    description: "Beratung und Umsetzung von Data-Engineering-Lösungen für KMUs",
    technologies: ["Python", "SQL", "Airbyte", "Docker", "ERP-Systeme", "Backup-Systeme"],
    type: "experience",
    achievements: [
      "Aufbau von Data Warehouses und ETL-Pipelines für verschiedene KMUs",
      "Administration und Support von ERP-Systemen"
    ]
  },
  {
    date: "2022 - Heute",
    title: "Data Engineering & DWH",
    description: "Aufbau von Pipelines und Data Warehouses für KMUs",
    technologies: ["Python", "SQL", "Airbyte", "Docker", "Data Warehouse"],
    type: "project",
    parentExperience: "Data Engineer & IT-Consultant"
  },
  {
    date: "2022 - Heute",
    title: "IT-Administration & Support",
    description: "ERP-Updates, Backups, Support und Security-Themen für Kundenprojekte",
    technologies: ["ERP", "Backup", "IT-Security", "Support"],
    type: "project",
    parentExperience: "Data Engineer & IT-Consultant"
  }
]; 