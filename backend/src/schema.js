import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Project {
        id: ID!
        title: String!
        description: String!
        image: String
        tags: [String!]!
        link: String
        github: String
        createdAt: String!
        updatedAt: String!
    }

    type Service {
        id: ID!
        title: String!
        description: String!
        icon: String!
        createdAt: String!
        updatedAt: String!
    }

    type Skill {
        id: ID!
        name: String!
        category: String!
        level: Int!
        icon: String
        createdAt: String!
        updatedAt: String!
    }

    type Contact {
        id: ID!
        name: String!
        email: String!
        message: String!
        projectType: String!
        createdAt: String!
        updatedAt: String!
    }

    type CV {
        id: ID!
        content: String!
        version: String!
        description: String!
        createdAt: String!
    }

    type PersonalInfo {
        name: String!
        position: String!
        languages: [Language!]!
    }

    type Language {
        name: String!
        level: String!
    }

    type WorkExperience {
        id: ID!
        title: String!
        company: String!
        period: String!
        description: String!
        achievements: [String!]!
        technologies: [String!]!
    }

    type Education {
        id: ID!
        degree: String!
        institution: String!
        period: String!
        focus: [String!]!
    }

    type Certification {
        id: ID!
        name: String!
        issuer: String!
        date: String!
        credentialId: String
    }

    type Page {
        id: ID!
        pageId: String!
        title: String!
        content: String!
        metaDescription: String
        updatedAt: String!
    }

    type Image {
        id: ID!
        name: String!
        url: String!
        category: String!
        createdAt: String!
    }

    type Settings {
        id: ID!
        siteName: String!
        siteDescription: String
        contactEmail: String!
        socialLinks: SocialLinks
        analyticsId: String
        security: SecuritySettings
        updatedAt: String!
    }

    type SocialLinks {
        linkedin: String
        twitter: String
        github: String
    }

    type SecuritySettings {
        twoFactorEnabled: Boolean!
        sessionTimeout: Int!
        allowedIPs: [String!]
    }

    type AuthPayload {
        token: String!
        success: Boolean!
    }

    type LoginResponse {
        token: String
        success: Boolean!
    }

    type Query {
        projects: [Project!]!
        project(id: ID!): Project
        services: [Service!]!
        service(id: ID!): Service
        skills: [Skill!]!
        skill(id: ID!): Skill
        contacts: [Contact!]!
        contact(id: ID!): Contact
        currentCV: CV
        page(pageId: String!): Page
        pages: [Page!]!
        images: [Image!]!
        settings: Settings
        isAuthenticated: Boolean!
    }

    input ProjectInput {
        title: String!
        description: String!
        image: String
        tags: [String!]!
        link: String
        github: String
    }

    input ServiceInput {
        title: String!
        description: String!
        icon: String!
    }

    input SkillInput {
        name: String!
        category: String!
        level: Int!
        icon: String
    }

    input ContactInput {
        name: String!
        email: String!
        message: String!
        projectType: String!
    }

    input PersonalInfoInput {
        name: String!
        position: String!
        languages: [LanguageInput!]!
    }

    input LanguageInput {
        name: String!
        level: String!
    }

    input WorkExperienceInput {
        title: String!
        company: String!
        period: String!
        description: String!
        achievements: [String!]!
        technologies: [String!]!
    }

    input EducationInput {
        degree: String!
        institution: String!
        period: String!
        focus: [String!]!
    }

    input CertificationInput {
        name: String!
        issuer: String!
        date: String!
        credentialId: String
    }

    input CVInput {
        personalInfo: PersonalInfoInput!
        workExperience: [WorkExperienceInput!]!
        education: [EducationInput!]!
        certifications: [CertificationInput!]!
    }

    input SettingsInput {
        siteName: String!
        siteDescription: String
        contactEmail: String!
        socialLinks: SocialLinksInput
        analyticsId: String
        security: SecuritySettingsInput
    }

    input SocialLinksInput {
        linkedin: String
        twitter: String
        github: String
    }

    input SecuritySettingsInput {
        twoFactorEnabled: Boolean!
        sessionTimeout: Int!
        allowedIPs: [String!]
    }

    type Mutation {
        createProject(input: ProjectInput!): Project!
        updateProject(id: ID!, input: ProjectInput!): Project!
        deleteProject(id: ID!): Boolean!
        createService(input: ServiceInput!): Service!
        updateService(id: ID!, input: ServiceInput!): Service!
        deleteService(id: ID!): Boolean!
        createSkill(input: SkillInput!): Skill!
        updateSkill(id: ID!, input: SkillInput!): Skill!
        deleteSkill(id: ID!): Boolean!
        createContact(input: ContactInput!): Contact!
        updateContact(id: ID!, input: ContactInput!): Contact!
        deleteContact(id: ID!): Boolean!
        createCV(input: CVInput!): CV!
        updateCV(id: ID!, input: CVInput!): CV!
        deleteCV(id: ID!): Boolean!
        login(email: String!, password: String!): LoginResponse!
        logout: Boolean!
        uploadCV(content: String!, version: String!, description: String!): CV!
        updatePage(pageId: String!, title: String!, content: String!, metaDescription: String): Page!
        uploadImage(name: String!, url: String!, category: String!): Image!
        deleteImage(id: ID!): Boolean!
        updateSettings(settings: SettingsInput!): Settings!
        updateSecuritySettings(settings: SecuritySettingsInput!): Settings!
        logoutAllSessions: Boolean!
        deleteAccount(password: String!): Boolean!
    }
`;

export { typeDefs }; 