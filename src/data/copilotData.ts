// ─── Types ───────────────────────────────────────────────────────────────────

export interface Citation {
  id: string;
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  snippet: string;
  confidence: number; // 0-100
  section?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  overallConfidence?: number;
  sourcesUsed?: number;
}

export interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'Manual' | 'Drawing' | 'Report' | 'Procedure';
  author: string;
  date: string;
  pages: number;
  relevanceScore: number;
  department: string;
  assetTag?: string;
  sections: DocumentSection[];
}

export interface DocumentSection {
  id: string;
  title: string;
  page: number;
  content: string;
}

// ─── Mock Documents ──────────────────────────────────────────────────────────

export const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    title: 'Gas Turbine GT-7001FA Maintenance Manual',
    type: 'Manual',
    author: 'GE Power Systems',
    date: '2024-08-15',
    pages: 342,
    relevanceScore: 96,
    department: 'Rotating Equipment',
    assetTag: 'GT-7001FA-U3',
    sections: [
      {
        id: 'SEC-001A',
        title: '4.3 — Hot Gas Path Inspection Procedure',
        page: 87,
        content:
          'The hot gas path (HGP) inspection is performed every 24,000 equivalent operating hours or 900 starts. This involves removal and inspection of first-stage nozzles, buckets, and shroud blocks. Key measurements include bucket tip clearance (nominal 2.54mm ± 0.15mm), nozzle trailing edge thickness, and thermal barrier coating (TBC) condition assessment using fluorescent penetrant inspection (FPI).',
      },
      {
        id: 'SEC-001B',
        title: '5.1 — Combustion System Inspection',
        page: 124,
        content:
          'Combustion inspection intervals are 8,000 EOH or 450 starts. Inspect transition pieces for cracks using borescope at ports C1-C8. Replace crossfire tubes showing >15% wall thinning. Verify fuel nozzle spray patterns against reference photographs in Appendix D. Record all findings in CMMS work order with photographic evidence.',
      },
      {
        id: 'SEC-001C',
        title: '7.2 — Bearing and Lubrication System',
        page: 201,
        content:
          'Journal bearing #1 and #2 clearances must be maintained within 0.15-0.25mm diametral range. Lube oil specification: ISO VG 32 turbine oil meeting GE specification GEK-32568. Oil reservoir operating temperature: 49-60°C. High temperature alarm at 71°C, trip at 77°C. Perform vibration analysis at each bearing location using dual-channel analyzer.',
      },
    ],
  },
  {
    id: 'DOC-002',
    title: 'OISD-STD-154: Safety Instrumented Systems for Process Industry',
    type: 'Procedure',
    author: 'Oil Industry Safety Directorate',
    date: '2023-11-01',
    pages: 89,
    relevanceScore: 88,
    department: 'Instrumentation & Control',
    sections: [
      {
        id: 'SEC-002A',
        title: '6.4 — SIL Verification and Validation',
        page: 34,
        content:
          'Each Safety Instrumented Function (SIF) shall be validated against its Safety Requirement Specification (SRS). Proof test intervals must not exceed the calculated values from SIL verification. For SIL-2 functions, the average Probability of Failure on Demand (PFDavg) shall be between 1×10⁻³ and 1×10⁻². All proof test procedures must be documented and approved by the functional safety engineer.',
      },
    ],
  },
  {
    id: 'DOC-003',
    title: 'Work Order WO-2024-4821: Compressor K-301 Vibration Analysis',
    type: 'Report',
    author: 'Rajesh Kumar, Sr. Vibration Analyst',
    date: '2025-01-10',
    pages: 18,
    relevanceScore: 92,
    department: 'Predictive Maintenance',
    assetTag: 'K-301-A',
    sections: [
      {
        id: 'SEC-003A',
        title: 'Analysis Summary & Findings',
        page: 3,
        content:
          'Overall vibration levels at Drive End (DE) bearing: 4.2 mm/s RMS velocity (Alert threshold: 5.0 mm/s). Spectral analysis reveals a dominant 1× running speed component (3,560 CPM) with emerging 2× component suggesting developing misalignment. Recommended action: Schedule coupling alignment check within 30 days. Current condition: ACCEPTABLE with trending toward ALERT.',
      },
    ],
  },
  {
    id: 'DOC-004',
    title: 'P&ID Drawing: Crude Distillation Unit — Overhead System',
    type: 'Drawing',
    author: 'Process Engineering Dept.',
    date: '2024-03-22',
    pages: 4,
    relevanceScore: 74,
    department: 'Process Engineering',
    assetTag: 'CDU-100',
    sections: [
      {
        id: 'SEC-004A',
        title: 'Sheet 3 — Overhead Condenser & Accumulator',
        page: 3,
        content:
          'Overhead condenser E-101A/B (shell & tube, CS/Admiralty Brass). Operating pressure: 1.8 kg/cm²g. Overhead accumulator D-102 with boot water draw. Level instruments: LT-1021A/B (DP type, SIL-2 rated). Relief valve PSV-1019 set at 3.5 kg/cm²g.',
      },
    ],
  },
  {
    id: 'DOC-005',
    title: 'PESO Statutory Inspection Report: Unfired Pressure Vessel UV-205',
    type: 'Report',
    author: 'PESO Inspector — A.K. Sharma',
    date: '2025-06-18',
    pages: 12,
    relevanceScore: 85,
    department: 'Statutory Compliance',
    assetTag: 'UV-205',
    sections: [
      {
        id: 'SEC-005A',
        title: 'Inspection Observations & Recommendations',
        page: 6,
        content:
          'Internal inspection revealed minor pitting corrosion on bottom head (max depth 1.2mm against 12mm nominal wall). Remaining life calculation per API 510: 8.4 years at current corrosion rate of 0.14 mm/year. Hydrostatic test conducted at 1.5× MAWP (22.5 kg/cm²g) — satisfactory. Certificate valid until June 2028. Recommendation: Install corrosion coupon rack for monitoring.',
      },
    ],
  },
];

// ─── Mock Conversations ──────────────────────────────────────────────────────

export const mockConversation: ChatMessage[] = [
  {
    id: 'MSG-001',
    role: 'user',
    content:
      'What is the recommended inspection interval for the hot gas path on our GE 7001FA gas turbine, and what are the key measurements to check?',
    timestamp: '2025-07-15T09:12:00Z',
  },
  {
    id: 'MSG-002',
    role: 'assistant',
    content: `The **Hot Gas Path (HGP) inspection** for the GE 7001FA gas turbine is required every **24,000 equivalent operating hours (EOH)** or **900 starts**, whichever comes first [1].

During the HGP inspection, the following key measurements and checks must be performed:

1. **Bucket Tip Clearance** — Nominal value of **2.54mm ± 0.15mm** [1]
2. **Nozzle Trailing Edge Thickness** — Measured against baseline values to detect erosion [1]  
3. **Thermal Barrier Coating (TBC) Condition** — Assessed using **Fluorescent Penetrant Inspection (FPI)** for crack detection [1]

The inspection involves removal and examination of first-stage nozzles, buckets, and shroud blocks. All findings should be documented with photographic evidence in the CMMS.

Additionally, the **combustion inspection** follows a shorter interval of **8,000 EOH or 450 starts** [2], and includes borescope inspection of transition pieces at ports C1-C8.`,
    timestamp: '2025-07-15T09:12:08Z',
    overallConfidence: 94,
    sourcesUsed: 2,
    citations: [
      {
        id: 'CIT-001',
        documentId: 'DOC-001',
        documentTitle: 'Gas Turbine GT-7001FA Maintenance Manual',
        pageNumber: 87,
        snippet:
          'HGP inspection is performed every 24,000 equivalent operating hours or 900 starts... bucket tip clearance (nominal 2.54mm ± 0.15mm)',
        confidence: 96,
        section: '4.3 — Hot Gas Path Inspection Procedure',
      },
      {
        id: 'CIT-002',
        documentId: 'DOC-001',
        documentTitle: 'Gas Turbine GT-7001FA Maintenance Manual',
        pageNumber: 124,
        snippet:
          'Combustion inspection intervals are 8,000 EOH or 450 starts. Inspect transition pieces for cracks using borescope at ports C1-C8.',
        confidence: 91,
        section: '5.1 — Combustion System Inspection',
      },
    ],
  },
  {
    id: 'MSG-003',
    role: 'user',
    content:
      'What is the current vibration status of Compressor K-301? Should I be concerned?',
    timestamp: '2025-07-15T09:14:22Z',
  },
  {
    id: 'MSG-004',
    role: 'assistant',
    content: `Based on the latest vibration analysis report (WO-2024-4821), here is the current status of **Compressor K-301**:

**Current Condition: ⚠️ ACCEPTABLE — trending toward ALERT**

| Parameter | Value | Threshold |
|---|---|---|
| Overall Vibration (DE Bearing) | **4.2 mm/s** RMS | Alert: 5.0 mm/s |
| Dominant Component | **1× running speed** (3,560 CPM) | — |
| Emerging Component | **2× running speed** | Suggests developing misalignment |

**Assessment:** While the current vibration level of 4.2 mm/s is within the acceptable range [1], the spectral analysis shows an **emerging 2× component** which is a classic indicator of **developing shaft misalignment** [1].

**Recommended Action:**
- Schedule a **coupling alignment check within 30 days** [1]
- Continue monitoring vibration trends at increased frequency (weekly instead of monthly)
- If vibration exceeds 5.0 mm/s before the alignment check, escalate to priority maintenance

This should be addressed proactively to prevent potential bearing damage or seal failure.`,
    timestamp: '2025-07-15T09:14:30Z',
    overallConfidence: 92,
    sourcesUsed: 1,
    citations: [
      {
        id: 'CIT-003',
        documentId: 'DOC-003',
        documentTitle:
          'Work Order WO-2024-4821: Compressor K-301 Vibration Analysis',
        pageNumber: 3,
        snippet:
          'Overall vibration levels at Drive End (DE) bearing: 4.2 mm/s RMS velocity... emerging 2× component suggesting developing misalignment.',
        confidence: 92,
        section: 'Analysis Summary & Findings',
      },
    ],
  },
  {
    id: 'MSG-005',
    role: 'user',
    content:
      'What does the latest PESO inspection say about pressure vessel UV-205? Is the certificate still valid?',
    timestamp: '2025-07-15T09:18:45Z',
  },
  {
    id: 'MSG-006',
    role: 'assistant',
    content: `Here is a summary of the PESO statutory inspection for **Unfired Pressure Vessel UV-205**:

**Certificate Status: ✅ VALID until June 2028**

**Key Findings:**

1. **Corrosion**: Minor pitting corrosion detected on the bottom head [1]
   - Max depth: **1.2mm** against **12mm nominal wall** (10% wall loss)
   - Corrosion rate: **0.14 mm/year**
   
2. **Remaining Life**: **8.4 years** calculated per API 510 methodology [1]

3. **Hydrostatic Test**: Conducted at **1.5× MAWP (22.5 kg/cm²g)** — **Satisfactory** [1]

**Inspector Recommendation:**
- Install a **corrosion coupon rack** for continuous monitoring of the corrosion rate [1]

**Risk Assessment:** The vessel is in acceptable condition with significant remaining life. However, the pitting corrosion pattern should be monitored. I recommend adding UV-205 to the next **Risk-Based Inspection (RBI)** review cycle to optimize the inspection interval based on actual degradation data.`,
    timestamp: '2025-07-15T09:18:54Z',
    overallConfidence: 89,
    sourcesUsed: 1,
    citations: [
      {
        id: 'CIT-004',
        documentId: 'DOC-005',
        documentTitle:
          'PESO Statutory Inspection Report: Unfired Pressure Vessel UV-205',
        pageNumber: 6,
        snippet:
          'Minor pitting corrosion on bottom head (max depth 1.2mm against 12mm nominal wall). Remaining life calculation per API 510: 8.4 years.',
        confidence: 89,
        section: 'Inspection Observations & Recommendations',
      },
    ],
  },
];

// ─── Suggested Follow-ups ────────────────────────────────────────────────────

export const suggestedQueries: string[] = [
  'Show me the bearing clearance specs for GT-7001FA',
  'What SIL level is required for LT-1021A/B level transmitters?',
  'Generate a comparison of last 3 inspection reports for UV-205',
  'What is the lube oil specification for the gas turbine?',
  'List all equipment due for statutory inspection this quarter',
];
