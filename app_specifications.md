# Product Specifications: Value Stream Mapping App

## 1. Introduction

This document provides a comprehensive set of specifications for the Value Stream Mapping (VSM) App, a web-based tool designed to help users analyze and optimize business processes. The app's primary function is to allow users to create digital VSMs, capturing data points such as process times, costs, risks, and financial metrics to drive data-informed decisions and process improvements.

---

## 2. Functional Requirements

### 2.1 Value Stream Management

* **User Story:** As a user, I can create, open, and delete multiple value stream maps to manage different projects or processes.

* **Specification:**
    * The application's home screen (Dashboard) will display a list of all existing value stream maps.
    * Each map will be represented by a card showing its title, creation date, and options to open or delete it.
    * A user must be able to create a new map by providing a title.
    * A confirmation dialog will appear before a map is permanently deleted.

### 2.2 Process Step Management

* **User Story:** As a user, I can add, edit, and delete process steps within a value stream map to build out a process flow.

* **Specification:**
    * The VSM Editor will have an "Add Step" button to append a new step to the end of the process flow.
    * Each process step will be an expandable component that contains editable fields for the following data:
        * **Step Name:** A descriptive name for the task (e.g., "Disassemble Tire").
        * **Employee Function:** The role responsible for the step (e.g., "A&P Technician").
        * **Time (minutes):** The time required to complete the step.
        * **Cycle Cost:** The direct cost associated with the task (e.g., labor cost).
        * **Inventory Costs:** The cost of materials consumed in this step.
        * **Total Cycle Cost:** A calculated field: `Cycle Cost + Defect Costs + Inventory Costs`.
    * Users will be able to delete an individual step via a button within the step component.

### 2.3 Risk Analysis

* **User Story:** As a user, I can associate defect risks with each process step to quantify potential problems and their impact.

* **Specification:**
    * Each process step's expandable component will have a section for "Defect Risks."
    * A dialog will be used to add a new risk, with the following fields:
        * **Description:** A brief explanation of the risk (e.g., "Tech loses hardware").
        * **Risk Time:** The time lost if the risk occurs (in minutes).
        * **Risk Probability:** The likelihood of the risk occurring (in percentage).
        * **Additional Risk Cost:** Any extra costs incurred if the risk happens (e.g., cost of a lost tool).
    * **Defect Cost:** Each risk will have a calculated cost: `(Risk Time / 60) * Labor Rate + Additional Risk Cost`. The total `Defect Costs` for a step will be the sum of all associated risk costs.
    * Users must be able to delete individual risks.

### 2.4 Financial and Process Metrics

* **User Story:** As a user, I can input high-level financial data and see a real-time summary of key performance indicators.

* **Specification:**
    * The VSM Editor will feature a dedicated metrics section at the top of the page.
    * Users can input values for:
        * **Revenue**
        * **Inventory (of finished goods)**
        * **Operating Expenses**
        * **Time in Motion (minutes):** The time spent moving items or waiting between steps.
    * The following metrics will be calculated and displayed in real-time:
        * **Total Process Time:** `Sum of all step times + Time in Motion`.
        * **Total Defect Cost:** `Sum of all Defect Costs from all steps`.
        * **Total Cycle Cost:** `Sum of all Total Cycle Costs from all steps`.
        * **Throughput:** `Revenue - Inventory`.
        * **EBITDA:** `Throughput - Operating Expenses`.

---

## 3. Technical Specifications

### 3.1 Architecture

* **Frontend:** React.js
* **Styling:** Tailwind CSS for a modern, responsive design.
* **UI Components:** Shadcn UI for polished, accessible components (Cards, Buttons, Dialogs, Inputs, etc.).
* **Backend/Database:** Firebase Firestore for a real-time, NoSQL database.

### 3.2 Data Model (Firestore)

The primary data model will be a top-level collection of `valueStreams`, with each document representing a single map.

**`valueStreams` Collection**
Each document in this collection will have the following structure:

```json
{
  "id": "unique-map-id",
  "title": "Tire Change Process",
  "createdAt": "2023-10-27T10:00:00Z",
  "userId": "firebase-user-id",
  "motionTime": 5, // minutes
  "processAccounting": {
    "revenue": 577.20,
    "inventory": 327.20,
    "operatingExpenses": 73.13
  },
  "steps": [
    {
      "id": "step-1-id",
      "name": "Remove MLG tire from the aircraft",
      "employeeFunction": "A&P",
      "time": 23,
      "cycleCost": 9.38,
      "inventoryCosts": 0,
      "totalCycleCost": 23.83, // Calculated
      "defectCosts": 14.46, // Calculated
      "risks": [
        {
          "id": "risk-1-id",
          "description": "Tech can't find the jack",
          "time": 15,
          "probability": 40, // %
          "additionalCost": 0,
          "cost": 2.50 // Calculated
        }
      ]
    }
  ]
}
