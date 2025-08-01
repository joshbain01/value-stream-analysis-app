# Product Requirements Document: Value Stream Mapping App

## 1. Introduction
This document outlines the product requirements for the Value Stream Mapping App, a tool designed to help businesses and individuals analyze and improve their operational processes. The application will provide a structured way to document process steps, associated costs, risks, and performance metrics.

## 2. Problem Statement
Many organizations struggle with identifying inefficiencies, bottlenecks, and hidden costs within their operational processes. Without a clear, data-driven overview, managers and teams rely on intuition, leading to suboptimal decisions and missed opportunities for improvement. The goal of this product is to provide a digital solution for creating value stream maps that makes this data visible and actionable.

## 3. Product Goals
-   Enable users to easily model and quantify their business processes.
-   Provide a real-time, interactive environment for tracking process metrics.
-   Facilitate the identification and analysis of defect risks.
-   Offer a single source of truth for value stream data.
-   Create an intuitive and user-friendly interface.

## 4. Target Audience
-   Process Improvement Engineers and Analysts
-   Operations Managers and Team Leads
-   Business Owners and Consultants
-   Anyone practicing Lean or Six Sigma methodologies

## 5. Key Features & User Stories

### Feature: Value Stream Map Management
-   **User Story**: As a user, I want to create a new value stream map so that I can start documenting a new process.
-   **User Story**: As a user, I want to see a list of all my saved value stream maps so I can quickly access and manage them.
-   **User Story**: As a user, I want to delete an existing map so I can remove obsolete or incorrect data.

### Feature: Process Step Management
-   **User Story**: As a user, I want to add new process steps to a map so I can build out the workflow of my process.
-   **User Story**: As a user, I want to edit the details of a step (e.g., name, time, employee function) so I can ensure the data is accurate.
-   **User Story**: As a user, I want to delete a process step so I can correct my map or remove irrelevant information.

### Feature: Risk Analysis
-   **User Story**: As a user, I want to add defect risks to a process step, including a description, time impact, probability, and cost so I can quantify potential problems.
-   **User Story**: As a user, I want to view a calculated risk cost for each risk so I can understand its financial impact.
-   **User Story**: As a user, I want to delete risks so I can keep my data current.

### Feature: High-Level Metrics
-   **User Story**: As a user, I want to input my high-level process financials (Revenue, Inventory, Operating Expenses) so the app can calculate key financial metrics.
-   **User Story**: As a user, I want to see an automatically calculated Throughput and EBITDA so I can understand the financial performance of the value stream.
-   **User Story**: As a user, I want to track the total time in motion between steps so I can identify non-value-added activities.

## 6. Out of Scope for this Version
-   **Visual Mapping**: This version will not include a graphical drag-and-drop interface for creating the value stream map. Steps will be represented in a list format.
-   **Multi-user Collaboration**: The app is designed for a single user per account and does not support real-time collaboration.
-   **Advanced Reporting**: Detailed charts, graphs, and export functionality (e.g., CSV, PDF) are not planned for this version.
-   **Authentication**: The current authentication is anonymous; a user sign-up/login system is not included.

## 7. Technical Requirements
-   **Frontend**: React, Tailwind CSS for styling, and Shadcn UI components for a consistent design system.
-   **Backend/Database**: Firebase Firestore for real-time data storage.
-   **Hosting**: Firebase Hosting (recommended for seamless integration).
