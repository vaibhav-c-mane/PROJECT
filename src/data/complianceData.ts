// ─── Types ───────────────────────────────────────────────────────────────────

export interface ComplianceStandard {
  id: string;
  name: string;
  shortName: string;
  icon: string; // lucide icon name
  overallScore: number; // 0-100
  status: 'Compliant' | 'At Risk' | 'Non-Compliant';
  lastAuditDate: string;
  nextDueDate: string;
  categories: ComplianceCategory[];
}

export interface ComplianceCategory {
  name: string;
  score: number;
  maxScore: number;
  status: 'pass' | 'warning' | 'fail';
}

export interface GapAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  standard: string;
  clauseRef: string;
  affectedArea: string;
  equipment?: string;
  timestamp: string;
  isNew: boolean;
  assignedTo?: string;
  department: string;
}

export interface EvidencePackage {
  id: string;
  packageId: string;
  standard: string;
  auditType: 'Internal' | 'External' | 'Regulatory' | 'Surveillance';
  status: 'Draft' | 'In Review' | 'Approved' | 'Exported';
  documentsCount: number;
  createdDate: string;
  dueDate: string;
  assignedTo: string;
  description: string;
  completionPercent: number;
}

// ─── Mock Compliance Standards ───────────────────────────────────────────────

export const mockComplianceStandards: ComplianceStandard[] = [
  {
    id: 'STD-001',
    name: 'Factories Act, 1948',
    shortName: 'Factory Act',
    icon: 'Building2',
    overallScore: 91,
    status: 'Compliant',
    lastAuditDate: '2025-04-15',
    nextDueDate: '2025-10-15',
    categories: [
      { name: 'Health & Welfare', score: 94, maxScore: 100, status: 'pass' },
      { name: 'Safety Provisions', score: 88, maxScore: 100, status: 'pass' },
      { name: 'Working Hours', score: 96, maxScore: 100, status: 'pass' },
      { name: 'Annual Leave', score: 100, maxScore: 100, status: 'pass' },
      { name: 'Hazardous Processes', score: 78, maxScore: 100, status: 'warning' },
    ],
  },
  {
    id: 'STD-002',
    name: 'OISD Standards (Oil Industry Safety Directorate)',
    shortName: 'OISD',
    icon: 'Flame',
    overallScore: 84,
    status: 'At Risk',
    lastAuditDate: '2025-03-20',
    nextDueDate: '2025-09-20',
    categories: [
      { name: 'Fire Protection (OISD-116)', score: 89, maxScore: 100, status: 'pass' },
      { name: 'SIS Systems (OISD-154)', score: 72, maxScore: 100, status: 'warning' },
      { name: 'Layout & Spacing (OISD-118)', score: 95, maxScore: 100, status: 'pass' },
      { name: 'Electrical Safety (OISD-137)', score: 80, maxScore: 100, status: 'warning' },
      { name: 'Pipeline Integrity (OISD-141)', score: 83, maxScore: 100, status: 'pass' },
    ],
  },
  {
    id: 'STD-003',
    name: 'PESO (Petroleum & Explosives Safety Organisation)',
    shortName: 'PESO',
    icon: 'ShieldAlert',
    overallScore: 95,
    status: 'Compliant',
    lastAuditDate: '2025-06-18',
    nextDueDate: '2026-06-18',
    categories: [
      { name: 'Pressure Vessel Certification', score: 98, maxScore: 100, status: 'pass' },
      { name: 'Boiler Inspection', score: 96, maxScore: 100, status: 'pass' },
      { name: 'Storage Tank Licensing', score: 92, maxScore: 100, status: 'pass' },
      { name: 'Gas Cylinder Rules', score: 94, maxScore: 100, status: 'pass' },
    ],
  },
  {
    id: 'STD-004',
    name: 'ISO 14001:2015 — Environmental Management',
    shortName: 'ISO 14001',
    icon: 'Leaf',
    overallScore: 76,
    status: 'At Risk',
    lastAuditDate: '2025-02-10',
    nextDueDate: '2025-08-10',
    categories: [
      { name: 'Environmental Policy', score: 90, maxScore: 100, status: 'pass' },
      { name: 'Aspects & Impacts', score: 82, maxScore: 100, status: 'pass' },
      { name: 'Legal Compliance', score: 74, maxScore: 100, status: 'warning' },
      { name: 'Emergency Preparedness', score: 68, maxScore: 100, status: 'fail' },
      { name: 'Monitoring & Measurement', score: 71, maxScore: 100, status: 'warning' },
      { name: 'Management Review', score: 80, maxScore: 100, status: 'pass' },
    ],
  },
  {
    id: 'STD-005',
    name: 'ISO 9001:2015 — Quality Management',
    shortName: 'ISO 9001',
    icon: 'BadgeCheck',
    overallScore: 88,
    status: 'Compliant',
    lastAuditDate: '2025-05-05',
    nextDueDate: '2025-11-05',
    categories: [
      { name: 'Quality Policy & Objectives', score: 92, maxScore: 100, status: 'pass' },
      { name: 'Document Control', score: 85, maxScore: 100, status: 'pass' },
      { name: 'Process Approach', score: 90, maxScore: 100, status: 'pass' },
      { name: 'Non-Conformance Mgmt', score: 82, maxScore: 100, status: 'pass' },
      { name: 'Internal Audit', score: 88, maxScore: 100, status: 'pass' },
      { name: 'Continuous Improvement', score: 86, maxScore: 100, status: 'pass' },
    ],
  },
];

// ─── Mock Gap Alerts ─────────────────────────────────────────────────────────

export const mockGapAlerts: GapAlert[] = [
  {
    id: 'GAP-001',
    severity: 'critical',
    title: 'SIF Proof Test Overdue — PSV-2034 (SIL-2)',
    description:
      'Safety Instrumented Function PSV-2034 proof test interval exceeded by 14 days. PFDavg may no longer meet SIL-2 requirements per OISD-154 clause 6.4.',
    standard: 'OISD-154',
    clauseRef: 'Clause 6.4',
    affectedArea: 'Crude Distillation Unit',
    equipment: 'PSV-2034',
    timestamp: '2025-07-15T08:30:00Z',
    isNew: true,
    department: 'Instrumentation',
  },
  {
    id: 'GAP-002',
    severity: 'critical',
    title: 'Emergency Drill Not Conducted Within Schedule',
    description:
      'Quarterly emergency evacuation drill for Block-C missed by 21 days. Non-compliance with ISO 14001 clause 8.2 and Factory Act Section 38.',
    standard: 'ISO 14001 / Factory Act',
    clauseRef: 'ISO 8.2 / Sec. 38',
    affectedArea: 'Block-C Production Area',
    timestamp: '2025-07-14T10:15:00Z',
    isNew: true,
    department: 'HSE',
  },
  {
    id: 'GAP-003',
    severity: 'warning',
    title: 'Expired Calibration Certificate — Flow Meter FT-3021',
    description:
      'NIST-traceable calibration certificate for flow meter FT-3021 expired on July 1, 2025. Measurement uncertainty for environmental discharge reporting may be affected.',
    standard: 'ISO 14001',
    clauseRef: 'Clause 9.1.1',
    affectedArea: 'Effluent Treatment Plant',
    equipment: 'FT-3021',
    timestamp: '2025-07-13T14:20:00Z',
    isNew: false,
    assignedTo: 'Prasad Rao',
    department: 'Instrumentation',
  },
  {
    id: 'GAP-004',
    severity: 'warning',
    title: 'Electrical Area Classification Review Pending',
    description:
      'Hazardous area classification drawings for Tank Farm Zone-2 not reviewed after installation of new transfer pump P-405. OISD-137 requires re-classification within 30 days of modification.',
    standard: 'OISD-137',
    clauseRef: 'Clause 5.3',
    affectedArea: 'Tank Farm',
    equipment: 'P-405',
    timestamp: '2025-07-12T09:45:00Z',
    isNew: false,
    assignedTo: 'Vikram Singh',
    department: 'Electrical',
  },
  {
    id: 'GAP-005',
    severity: 'info',
    title: 'Document Revision Pending — SOP-MNT-042',
    description:
      'Standard Operating Procedure for turbine lube oil system flushing (SOP-MNT-042) is due for biennial review. Current revision: Rev-3 (dated Jan 2024).',
    standard: 'ISO 9001',
    clauseRef: 'Clause 7.5.2',
    affectedArea: 'Turbine Bay',
    timestamp: '2025-07-11T16:00:00Z',
    isNew: false,
    assignedTo: 'Deepak Sharma',
    department: 'Maintenance',
  },
  {
    id: 'GAP-006',
    severity: 'warning',
    title: 'Non-Conformance Report NCR-2025-088 Open > 30 Days',
    description:
      'NCR for inadequate fire water network pressure test results remains open beyond the 30-day closure target. Root cause analysis and corrective action plan pending.',
    standard: 'OISD-116',
    clauseRef: 'Clause 4.8',
    affectedArea: 'Fire Water System',
    timestamp: '2025-07-10T11:30:00Z',
    isNew: false,
    department: 'Fire & Safety',
  },
  {
    id: 'GAP-007',
    severity: 'critical',
    title: 'PESO License Renewal — Hydrogen Storage',
    description:
      'PESO license for hydrogen storage facility HYD-STORE-01 expires on August 15, 2025. Application for renewal must be submitted 30 days prior.',
    standard: 'PESO',
    clauseRef: 'Gas Cylinder Rules',
    affectedArea: 'Hydrogen Plant',
    equipment: 'HYD-STORE-01',
    timestamp: '2025-07-09T08:00:00Z',
    isNew: true,
    department: 'Statutory Compliance',
  },
  {
    id: 'GAP-008',
    severity: 'info',
    title: 'Internal Quality Audit Schedule Published',
    description:
      'Q3 internal audit schedule released. 12 process areas scheduled for audit between Aug 1 – Sep 30, 2025. Audit team assignments pending confirmation.',
    standard: 'ISO 9001',
    clauseRef: 'Clause 9.2',
    affectedArea: 'All Departments',
    timestamp: '2025-07-08T15:00:00Z',
    isNew: false,
    assignedTo: 'Quality Team',
    department: 'Quality Assurance',
  },
  {
    id: 'GAP-009',
    severity: 'warning',
    title: 'PPE Compliance Below Threshold — Workshop Area',
    description:
      'Monthly PPE compliance audit for Workshop Area shows 78% compliance rate against 95% target. Key gaps: safety glasses (82%) and hearing protection (71%).',
    standard: 'Factory Act',
    clauseRef: 'Section 35/36',
    affectedArea: 'Central Workshop',
    timestamp: '2025-07-07T13:00:00Z',
    isNew: false,
    assignedTo: 'Safety Officer',
    department: 'HSE',
  },
];

// ─── Mock Evidence Packages ──────────────────────────────────────────────────

export const mockEvidencePackages: EvidencePackage[] = [
  {
    id: 'ev-1',
    packageId: 'EVP-2025-001',
    standard: 'PESO',
    auditType: 'Regulatory',
    status: 'Approved',
    documentsCount: 24,
    createdDate: '2025-06-01',
    dueDate: '2025-06-15',
    assignedTo: 'Manish Reddy',
    description: 'PESO statutory inspection evidence package for UV-205, UV-206, and BLR-101.',
    completionPercent: 100,
  },
  {
    id: 'ev-2',
    packageId: 'EVP-2025-002',
    standard: 'ISO 9001',
    auditType: 'External',
    status: 'Exported',
    documentsCount: 45,
    createdDate: '2025-05-10',
    dueDate: '2025-05-30',
    assignedTo: 'Quality Team',
    description:
      'ISO 9001:2015 surveillance audit evidence. Covers clauses 4-10 with supporting NCR closures.',
    completionPercent: 100,
  },
  {
    id: 'ev-3',
    packageId: 'EVP-2025-003',
    standard: 'ISO 14001',
    auditType: 'Internal',
    status: 'In Review',
    documentsCount: 31,
    createdDate: '2025-07-01',
    dueDate: '2025-07-31',
    assignedTo: 'HSE Department',
    description:
      'Internal audit evidence for environmental management system. Focus areas: waste management, emissions monitoring, spill prevention.',
    completionPercent: 72,
  },
  {
    id: 'ev-4',
    packageId: 'EVP-2025-004',
    standard: 'OISD-154',
    auditType: 'Regulatory',
    status: 'Draft',
    documentsCount: 18,
    createdDate: '2025-07-10',
    dueDate: '2025-08-15',
    assignedTo: 'Instrumentation Lead',
    description:
      'SIS proof test documentation and SIL verification records for OISD-154 compliance submission.',
    completionPercent: 35,
  },
  {
    id: 'ev-5',
    packageId: 'EVP-2025-005',
    standard: 'Factory Act',
    auditType: 'Regulatory',
    status: 'In Review',
    documentsCount: 38,
    createdDate: '2025-06-15',
    dueDate: '2025-07-30',
    assignedTo: 'HR & Admin',
    description:
      'Factory Inspector visit preparation. Working hours records, canteen hygiene certificates, and safety training logs.',
    completionPercent: 85,
  },
  {
    id: 'ev-6',
    packageId: 'EVP-2025-006',
    standard: 'OISD-116',
    auditType: 'Internal',
    status: 'Draft',
    documentsCount: 12,
    createdDate: '2025-07-12',
    dueDate: '2025-08-30',
    assignedTo: 'Fire & Safety',
    description:
      'Fire protection system adequacy assessment. Fire water network test reports, foam system records, fire detection system certificates.',
    completionPercent: 22,
  },
  {
    id: 'ev-7',
    packageId: 'EVP-2025-007',
    standard: 'ISO 9001',
    auditType: 'Surveillance',
    status: 'Approved',
    documentsCount: 28,
    createdDate: '2025-04-01',
    dueDate: '2025-04-30',
    assignedTo: 'Quality Team',
    description: 'Q1 2025 surveillance audit follow-up. Corrective actions and effectiveness verification.',
    completionPercent: 100,
  },
  {
    id: 'ev-8',
    packageId: 'EVP-2025-008',
    standard: 'OISD-137',
    auditType: 'Internal',
    status: 'Draft',
    documentsCount: 8,
    createdDate: '2025-07-14',
    dueDate: '2025-09-15',
    assignedTo: 'Electrical Lead',
    description:
      'Hazardous area electrical equipment inspection records and area classification review documentation.',
    completionPercent: 15,
  },
  {
    id: 'ev-9',
    packageId: 'EVP-2025-009',
    standard: 'PESO',
    auditType: 'Regulatory',
    status: 'In Review',
    documentsCount: 15,
    createdDate: '2025-07-05',
    dueDate: '2025-08-05',
    assignedTo: 'Statutory Compliance',
    description: 'PESO hydrogen storage license renewal application package with updated safety assessment.',
    completionPercent: 60,
  },
  {
    id: 'ev-10',
    packageId: 'EVP-2025-010',
    standard: 'ISO 14001',
    auditType: 'External',
    status: 'Exported',
    documentsCount: 52,
    createdDate: '2025-02-01',
    dueDate: '2025-03-01',
    assignedTo: 'HSE Department',
    description:
      'Re-certification audit evidence package. Complete EMS documentation including legal register, environmental objectives, and performance data.',
    completionPercent: 100,
  },
];
