import {
  User,
  Category,
  Note,
  Bookmark,
  StudyCollection,
  Review,
  RecentlyViewedEntry,
  AppNotification,
} from '../types';

export const INITIAL_USER: User = {
  id: 'usr_student_01',
  name: 'Aarav Mehta',
  email: 'aarav.mehta@university.edu',
  university: 'National Institute of Technology',
  department: 'B.Tech Computer Science & Engineering',
  semester: 'Semester 5',
  studentId: 'CS-2024-0892',
  bio: '3rd-year CSE undergraduate focusing on Systems Architecture, Distributed Databases, and Algorithmic Problem Solving.',
  role: 'Class Representative',
  joinedDate: 'August 2024',
  themePreference: 'light',
  defaultViewMode: 'grid',
  notifications: {
    newSubjectUploads: true,
    weeklyRevisionDigest: true,
    bookmarkUpdates: true,
    examReminders: true,
    commentReplies: false,
  },
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat_cs',
    name: 'Computer Science',
    slug: 'computer-science',
    iconName: 'Cpu',
    description: 'Core systems, operating kernels, database internals, computer networks, and distributed computing.',
    subjects: ['Operating Systems', 'Computer Networks', 'Database Management Systems', 'Theory of Computation'],
    popularTopics: ['Process Synchronization', 'TCP Congestion Control', 'B+ Tree Indexing', 'Virtual Memory'],
  },
  {
    id: 'cat_prog',
    name: 'Programming & DSA',
    slug: 'programming',
    iconName: 'Code2',
    description: 'Data structures, algorithmic paradigms, object-oriented design patterns, and modern language internals.',
    subjects: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'System Design', 'Compiler Design'],
    popularTopics: ['Dynamic Programming', 'Graph Shortest Paths', 'Red-Black Trees', 'Memory Management'],
  },
  {
    id: 'cat_math',
    name: 'Mathematics',
    slug: 'mathematics',
    iconName: 'Sigma',
    description: 'Discrete structures, linear algebra, probability distributions, multivariable calculus, and optimization.',
    subjects: ['Discrete Mathematics', 'Linear Algebra & Matrix Theory', 'Probability & Statistics', 'Engineering Calculus'],
    popularTopics: ['Eigenvalues & SVD', 'Bayesian Inference', 'Graph Theory & Trees', 'Recurrence Relations'],
  },
  {
    id: 'cat_eng',
    name: 'Engineering',
    slug: 'engineering',
    iconName: 'Layers',
    description: 'Software engineering lifecycles, digital logic circuits, microprocessor architecture, and embedded systems.',
    subjects: ['Software Engineering', 'Digital Logic & Computer Organization', 'Microprocessors'],
    popularTopics: ['Agile & Scrum Architecture', 'Pipelining Hazards', 'Karnaugh Maps', 'CI/CD Testing'],
  },
  {
    id: 'cat_sci',
    name: 'Science',
    slug: 'science',
    iconName: 'Atom',
    description: 'Applied physics, semiconductor mechanics, electromagnetic wave theory, and computational chemistry.',
    subjects: ['Engineering Physics', 'Semiconductor Optoelectronics', 'Environmental Science'],
    popularTopics: ['Quantum Tunneling', 'Maxwell Equations', 'Solid State Band Theory', 'Laser Spectroscopy'],
  },
  {
    id: 'cat_biz',
    name: 'Business & Economics',
    slug: 'business',
    iconName: 'Briefcase',
    description: 'Engineering economics, product management, financial statement analysis, and startup strategy.',
    subjects: ['Macroeconomics & Policy', 'Financial & Managerial Accounting', 'Tech Product Management'],
    popularTopics: ['Net Present Value (NPV)', 'Unit Economics', 'Market Equilibrium', 'Balance Sheet Analysis'],
  },
  {
    id: 'cat_gen',
    name: 'General Studies',
    slug: 'general-studies',
    iconName: 'BookOpen',
    description: 'Technical communication, research methodology, academic writing, professional ethics, and aptitude.',
    subjects: ['Technical Communication', 'Research Methodology & Ethics', 'Quantitative Aptitude'],
    popularTopics: ['IEEE Paper Formatting', 'Hypothesis Testing', 'Logical Deduction', 'Intellectual Property'],
  },
];

export const INITIAL_COLLECTIONS: StudyCollection[] = [
  {
    id: 'col_midterm',
    name: 'Midterm Exam Sprint',
    description: 'High-priority core CS units scheduled for next week’s mid-semester examination.',
    createdAt: '2026-10-12',
  },
  {
    id: 'col_placements',
    name: 'Core Technical Interviews',
    description: 'Must-revise OS, DBMS, Networking, and DSA notes for internship and placement rounds.',
    createdAt: '2026-10-18',
  },
  {
    id: 'col_math_foundations',
    name: 'Math & Proofs Reference',
    description: 'Formula sheets, theorems, and worked examples for Linear Algebra and Discrete Math.',
    createdAt: '2026-10-24',
  },
];

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note_os_01',
    title: 'Operating Systems: Process Synchronization, Deadlocks & Virtual Memory',
    subject: 'Operating Systems',
    categoryId: 'cat_cs',
    semester: 'Semester 5',
    unit: 'Unit 3 & 4 — Concurrency & Memory',
    description:
      'Comprehensive lecture synthesis covering critical section problems, Peterson’s solution, hardware atomic instructions, semaphores, classical synchronization problems, Banker’s deadlock avoidance algorithm, demand paging, and TLB page replacement policies.',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    pageCount: 4,
    uploadDate: '2026-10-28',
    uploaderId: 'usr_student_01',
    uploaderName: 'Aarav Mehta',
    uploaderRole: 'Class Representative',
    tags: ['Semaphores', 'Deadlocks', 'Banker Algorithm', 'Demand Paging', 'LRU', 'Virtual Memory'],
    rating: 4.9,
    ratingCount: 48,
    viewsCount: 1240,
    downloadsCount: 412,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'sec_1',
        title: '1. Critical Section & Mutex Primitives',
        pageNumber: 1,
        summary: 'Mutual exclusion, progress, bounded waiting, and hardware test-and-set instructions.',
      },
      {
        id: 'sec_2',
        title: '2. Semaphores & Classical Problems',
        pageNumber: 2,
        summary: 'Counting vs binary semaphores, Producer-Consumer, Readers-Writers, and Dining Philosophers.',
      },
      {
        id: 'sec_3',
        title: '3. Deadlock Characterization & Banker’s Algorithm',
        pageNumber: 3,
        summary: 'Coffman conditions, Resource Allocation Graphs, and safe-state matrix verification.',
      },
      {
        id: 'sec_4',
        title: '4. Virtual Memory, Paging & Thrashing',
        pageNumber: 4,
        summary: 'Page tables, TLB effective access time (EAT), FIFO/Optimal/LRU replacement, and working-set model.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 3.1 — Process Synchronization Fundamentals',
        heading: 'The Critical Section Problem & Synchronization Hardware',
        paragraphs: [
          'Concurrent access to shared memory structures in a multiprogramming kernel can result in race conditions where the final state depends on the non-deterministic interleaving of instruction streams. A valid solution to the Critical Section problem must strictly satisfy three invariants:',
          '1. Mutual Exclusion: If process Pi is executing in its critical section, no other process can execute in its critical section simultaneously.\n2. Progress: If no process is inside its critical section and some processes wish to enter, only those not in their remainder sections participate in deciding who enters next, and this decision cannot be postponed indefinitely.\n3. Bounded Waiting: There exists a strict upper bound on the number of times other processes are allowed to enter their critical sections after a process has requested entry.',
        ],
        keyFormulaOrCode: `// Atomic Compare-and-Swap (CAS) Hardware Instruction
int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;
    return temp;
}`,
        diagramCaption: 'Figure 3.1: Entry, Critical, Exit, and Remainder sections in a cooperative kernel loop.',
        takeaways: [
          'Disable interrupts only works on uniprocessor kernels; multiprocessors require atomic memory barriers.',
          'Spinlocks avoid context-switch overhead when lock hold duration is shorter than two context switches.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 3.2 — Semaphores & Classical Concurrency Patterns',
        heading: 'Wait/Signal Operations & Dining Philosophers Avoidance',
        paragraphs: [
          'Proposed by Edsger Dijkstra, a semaphore S is an integer variable accessed exclusively through two atomic standard operations: wait(S) [originally P] and signal(S) [originally V]. To eliminate busy waiting (spinlocking), a waiting process blocks itself and places its PCB into a wait queue associated with the semaphore.',
          'In the Readers-Writers problem, first-preference readers can starve writers if read_count never drops to zero. In the Dining Philosophers problem, naive acquisition of left then right chopsticks leads to circular wait when all five philosophers become hungry simultaneously.',
        ],
        keyFormulaOrCode: `// Writer-Safe Readers-Writers Synchronization
wait(rw_mutex);
   /* Critical Section: Perform Write Operation */
signal(rw_mutex);

// Asymmetric Dining Philosophers Solution:
// Odd-numbered philosophers pick up LEFT chopstick first;
// Even-numbered philosophers pick up RIGHT chopstick first.`,
        diagramCaption: 'Figure 3.4: Monitor encapsulation with condition variables x.wait() and x.signal().',
        takeaways: [
          'Binary semaphores range between 0 and 1; counting semaphores control access to N identical resource instances.',
          'Priority Inversion occurs when a low-priority task holds a kernel lock needed by a high-priority task; solved via Priority Inheritance Protocol.',
        ],
      },
      {
        pageNumber: 3,
        sectionTitle: 'Unit 3.3 — Deadlock Handling & Banker’s Safety Algorithm',
        heading: 'Coffman’s Four Conditions & Safe Sequence Computation',
        paragraphs: [
          'A deadlock state arises if and only if four conditions hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If a Resource Allocation Graph (RAG) has no cycles, no deadlock exists. If each resource type has exactly one instance, a cycle is both necessary and sufficient for deadlock.',
          'Dijkstra’s Banker’s Algorithm dynamically inspects every resource request to verify whether granting the allocation leaves the system in a Safe State—meaning there exists at least one safe execution sequence <P1, P2, ..., Pn> where each process can satisfy its Maximum Need.',
        ],
        keyFormulaOrCode: `Need[i, j] = Max[i, j] - Allocation[i, j]

// Safety Check Step:
Find index i such that:
  Finish[i] == false  AND  Need[i] <= Work
If found:
  Work = Work + Allocation[i]
  Finish[i] = true`,
        diagramCaption: 'Table 3.2: Banker’s Algorithm complexity is O(m × n²) for n processes and m resource classes.',
        takeaways: [
          'Breaking Circular Wait by enforcing a strict global ordering R1 < R2 < ... < Rm is the most practical prevention strategy.',
          'Unsafe state does not automatically equal Deadlock; it means the OS can no longer guarantee deadlock avoidance if processes request their maximum declared claims.',
        ],
      },
      {
        pageNumber: 4,
        sectionTitle: 'Unit 4.1 — Virtual Memory, TLB & Page Replacement',
        heading: 'Effective Access Time (EAT) & Belady’s Anomaly',
        paragraphs: [
          'Virtual memory decouples the logical address space perceived by user processes from physical RAM frames using demand paging. Translation Lookaside Buffers (TLBs) cache recent virtual-to-physical page translations in associative hardware registers.',
          'When a page fault trap occurs, the OS locates the missing page on backing store, loads it into a free physical frame (or evicts a victim frame using FIFO, Optimal, or LRU), updates the page table bit, and restarts the faulted instruction.',
        ],
        keyFormulaOrCode: `// Effective Access Time with TLB Hit Ratio (α) and Page Fault Rate (p):
EAT_TLB = α × (t_TLB + t_mem) + (1 - α) × (t_TLB + 2 × t_mem)
EAT_DemandPaging = (1 - p) × Memory_Access + p × Page_Fault_Service_Time`,
        diagramCaption: 'Figure 4.2: Thrashing occurs when Σ Working_Set_Size(i) > Total Available Physical Frames.',
        takeaways: [
          'FIFO replacement suffers from Belady’s Anomaly (more frames can increase page faults); stack algorithms like LRU and Optimal never suffer from Belady’s Anomaly.',
          'Even a tiny page fault rate p = 0.001 can degrade Effective Access Time by 40x if disk/SSD swap latency is high.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'This unit bridges kernel concurrency and virtual memory management. Expect numerical exam questions on Banker’s safe-sequence matrices, TLB Effective Access Time (EAT) calculations, and LRU vs Optimal page replacement reference strings.',
      estimatedStudyMinutes: 35,
      examWeightageHint: 'High Weightage (~22% of End-Sem Paper)',
      keyPoints: [
        'All four Coffman conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) must hold simultaneously for deadlock.',
        'Need Matrix = Max Matrix − Allocation Matrix; always verify Need[i] ≤ Work (Available) at each step.',
        'LRU and Optimal are stack algorithms and are immune to Belady’s Anomaly.',
        'Working Set Δ tracks active locality; when total working sets exceed physical frames, thrashing drops CPU utilization sharply.',
      ],
      autoTags: [
        { label: 'Concurrency & Locks', confidence: '99%', category: 'Core Concept' },
        { label: 'Banker’s Matrix Math', confidence: '97%', category: 'Numerical Problem' },
        { label: 'Page Replacement', confidence: '96%', category: 'Algorithm' },
        { label: 'TLB & EAT Formula', confidence: '94%', category: 'Formula' },
      ],
      flashcards: [
        {
          id: 'fc_os_1',
          topic: 'Deadlocks',
          question: 'Does an Unsafe State in Banker’s Algorithm mean the system is currently deadlocked?',
          answer:
            'No. An unsafe state simply means the OS cannot guarantee preventing a deadlock if processes subsequently request up to their declared Maximum need. If processes release resources early, deadlock may still be avoided.',
        },
        {
          id: 'fc_os_2',
          topic: 'Virtual Memory',
          question: 'Why are LRU and Optimal page replacement immune to Belady’s Anomaly?',
          answer:
            'Both belong to the class of Stack Algorithms, where the set of pages in memory with k frames is always a strict subset of the pages in memory with k + 1 frames at the same point in the reference string.',
        },
        {
          id: 'fc_os_3',
          topic: 'Synchronization',
          question: 'What is Priority Inversion and how do real-time kernels resolve it?',
          answer:
            'Priority Inversion occurs when a high-priority process waits for a lock held by a low-priority process that gets preempted by a medium-priority process. Resolved via the Priority Inheritance Protocol.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_os_1',
          question:
            'Given a TLB hit ratio of 90%, TLB lookup time of 10 ns, and main memory access time of 100 ns (single-level page table), what is the Effective Access Time (EAT)?',
          options: ['110 ns', '120 ns', '130 ns', '190 ns'],
          correctIndex: 1,
          explanation: 'EAT = 0.90 × (10 + 100) + 0.10 × (10 + 200) = 99 + 21 = 120 ns.',
        },
        {
          id: 'qz_os_2',
          question:
            'A system has 3 processes, each requiring at most 4 units of resource R. What is the minimum number of units of R needed to guarantee the system is deadlock-free?',
          options: ['9 units', '10 units', '11 units', '12 units'],
          correctIndex: 1,
          explanation:
            'Worst-case deadlock holds when each of the 3 processes holds (4 - 1) = 3 units (total 9). Adding 1 more unit (9 + 1 = 10) guarantees at least one process can finish.',
        },
      ],
      examPrepChecklist: [
        'Practice 5×4 Banker’s Algorithm safety sequence trace by hand.',
        'Compare FIFO, Optimal, and LRU page faults on a 20-page reference string.',
        'Memorize Producer-Consumer and Readers-Writers semaphore orderings.',
      ],
    },
  },
  {
    id: 'note_cn_02',
    title: 'Computer Networks: TCP Congestion Control, IPv4 Subnetting & OSPF Routing',
    subject: 'Computer Networks',
    categoryId: 'cat_cs',
    semester: 'Semester 5',
    unit: 'Unit 3 & 4 — Network & Transport Layer',
    description:
      'Complete breakdown of CIDR classless subnetting, NAT translation tables, Dijkstra Link-State (OSPF) vs Distance Vector (Bellman-Ford) routing, TCP 3-way handshake, Slow Start, Congestion Avoidance (AIMD), and Fast Retransmit / Fast Recovery state machines.',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    pageCount: 3,
    uploadDate: '2026-10-26',
    uploaderId: 'usr_prof_02',
    uploaderName: 'Riya Sharma',
    uploaderRole: 'Teaching Assistant',
    tags: ['TCP Tahoe & Reno', 'CIDR Subnetting', 'OSPF', 'BGP', 'Sliding Window', 'Flow Control'],
    rating: 4.8,
    ratingCount: 39,
    viewsCount: 980,
    downloadsCount: 356,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'cn_sec_1',
        title: '1. CIDR Addressing & VLSM Subnet Masks',
        pageNumber: 1,
        summary: 'Prefix aggregation, broadcast calculation, and longest prefix match forwarding.',
      },
      {
        id: 'cn_sec_2',
        title: '2. Intra-AS Routing: RIP vs OSPF',
        pageNumber: 2,
        summary: 'Count-to-infinity problem, Poisoned Reverse, and Dijkstra shortest-path tree construction.',
      },
      {
        id: 'cn_sec_3',
        title: '3. TCP Flow & Congestion Control (Tahoe vs Reno)',
        pageNumber: 3,
        summary: 'cwnd evolution, ssthresh halving, triple duplicate ACKs vs timeout events.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 3.1 — IPv4 CIDR & Longest Prefix Matching',
        heading: 'Classless Inter-Domain Routing & VLSM Block Allocation',
        paragraphs: [
          'CIDR eliminates rigid Class A/B/C boundaries by using variable-length prefix masks written in a.b.c.d/x notation, where x specifies the number of leading network bits. Routers forward packets by consulting forwarding tables using the Longest Prefix Match rule.',
          'When subdividing a subnet using Variable Length Subnet Masking (VLSM), always allocate the largest host blocks first and align every subnet starting address on an integer multiple of its block size 2^(32-x).',
        ],
        keyFormulaOrCode: `Usable Hosts per /x Subnet = 2^(32 - x) - 2
Example: 192.168.16.0/22
  Network Mask : 255.255.252.0
  Address Range: 192.168.16.0 to 192.168.19.255 (1,022 usable hosts)`,
        diagramCaption: 'Figure 3.1: Binary Trie lookup for Longest Prefix Match in a core router.',
        takeaways: [
          'Subtract 2 from total addresses in standard IPv4 subnets for Network ID (all host bits 0) and Directed Broadcast (all host bits 1).',
          'Route aggregation (supernetting) collapses contiguous prefixes into a single summary announcement.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 3.2 — Routing Algorithms: Distance Vector vs Link State',
        heading: 'Bellman-Ford Count-to-Infinity vs Dijkstra Link State',
        paragraphs: [
          'Distance Vector protocols (like RIP) exchange distance vectors only with immediate neighbors using the Bellman-Ford equation: Dx(y) = min_v { c(x,v) + Dv(y) }. When link costs surge, bad news travels slowly ("Count-to-Infinity"), partially mitigated by Split Horizon with Poisoned Reverse.',
          'Link-State protocols (like OSPF) flood Link-State Advertisements (LSAs) across the autonomous system so every router maintains an identical topological graph and runs Dijkstra’s algorithm in O(V² ) or O(E + V log V) time.',
        ],
        keyFormulaOrCode: `// Bellman-Ford Dynamic Update Rule:
D_x(y) = min_v { cost(x, v) + D_v(y) }

// OSPF Area Hierarchy:
Area 0 (Backbone Area) interconnects all non-backbone OSPF areas via Area Border Routers (ABRs).`,
        diagramCaption: 'Figure 3.5: Link failure propagation in 3-node Distance Vector routing loop.',
        takeaways: [
          'Poisoned Reverse solves 2-node routing loops immediately, but loops involving 3 or more nodes still require maximum hop limits (16 = infinity in RIP).',
        ],
      },
      {
        pageNumber: 3,
        sectionTitle: 'Unit 4.2 — TCP Congestion Control State Machine',
        heading: 'Slow Start, AIMD & TCP Reno Fast Recovery',
        paragraphs: [
          'TCP senders bound their unacknowledged in-flight bytes by min(cwnd, rwnd), balancing network congestion capacity (cwnd) with receiver buffer availability (rwnd). During Slow Start, cwnd starts at 1 MSS and doubles every RTT (+1 MSS per ACK received) until reaching ssthresh.',
          'Above ssthresh, Congestion Avoidance grows cwnd linearly (+1 MSS per RTT, Additive Increase). On a Retransmission Timeout (RTO), both TCP Tahoe and TCP Reno set ssthresh = cwnd / 2 and reset cwnd = 1 MSS. On 3 Duplicate ACKs, TCP Reno halves cwnd (cwnd = ssthresh + 3 MSS) without dropping to 1 MSS.',
        ],
        keyFormulaOrCode: `Effective Window = min(cwnd, rwnd)
On Timeout (Tahoe & Reno):
  ssthresh = max(cwnd / 2, 2 * MSS)
  cwnd = 1 * MSS (enter Slow Start)
On 3 Duplicate ACKs (TCP Reno):
  ssthresh = cwnd / 2
  cwnd = ssthresh (enter Fast Recovery / Congestion Avoidance)`,
        diagramCaption: 'Figure 4.8: Classic TCP Reno sawtooth cwnd trajectory across RTTs.',
        takeaways: [
          'Slow Start is exponential (doubles per RTT), despite its name.',
          'Throughput of a TCP connection is approximately (0.75 × W × MSS) / RTT.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Covers IPv4 CIDR subnetting math, OSPF vs RIP routing convergence, and TCP congestion window (cwnd) dynamics across Slow Start, AIMD, and Fast Recovery.',
      estimatedStudyMinutes: 30,
      examWeightageHint: 'High Weightage (~20% of End-Sem Paper)',
      keyPoints: [
        'Longest Prefix Match always selects the routing entry with the highest /x mask length.',
        'TCP Tahoe resets cwnd to 1 MSS on both Timeout and 3 Duplicate ACKs; TCP Reno halves cwnd on 3 Duplicate ACKs.',
        'Effective sending window is strictly min(cwnd, rwnd).',
      ],
      autoTags: [
        { label: 'CIDR & VLSM', confidence: '98%', category: 'Addressing' },
        { label: 'TCP Reno Sawtooth', confidence: '97%', category: 'Transport Protocol' },
        { label: 'Dijkstra & Bellman-Ford', confidence: '95%', category: 'Routing' },
      ],
      flashcards: [
        {
          id: 'fc_cn_1',
          topic: 'TCP Congestion',
          question: 'How does TCP Reno differ from TCP Tahoe when 3 Duplicate ACKs are received?',
          answer:
            'TCP Tahoe resets cwnd to 1 MSS and re-enters Slow Start, whereas TCP Reno sets ssthresh = cwnd / 2 and cwnd = ssthresh + 3 MSS (Fast Recovery), avoiding a full pipeline drain.',
        },
        {
          id: 'fc_cn_2',
          topic: 'IPv4 Subnetting',
          question: 'How many usable host IP addresses exist in a /26 IPv4 subnet?',
          answer: '2^(32 - 26) - 2 = 2^6 - 2 = 64 - 2 = 62 usable host addresses.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_cn_1',
          question:
            'A TCP connection has ssthresh = 16 MSS and cwnd = 1 MSS. Assuming no loss, how many RTTs does it take for cwnd to reach 16 MSS during Slow Start?',
          options: ['3 RTTs', '4 RTTs', '8 RTTs', '15 RTTs'],
          correctIndex: 1,
          explanation: 'cwnd doubles each RTT: 1 -> 2 (RTT 1) -> 4 (RTT 2) -> 8 (RTT 3) -> 16 (RTT 4).',
        },
      ],
      examPrepChecklist: [
        'Practice VLSM block partitioning for 4 departments of varying sizes.',
        'Trace cwnd and ssthresh values across 12 RTTs with one timeout and one 3-Dup-ACK event.',
      ],
    },
  },
  {
    id: 'note_dbms_03',
    title: 'Database Management Systems: B+ Tree Indexing, Normalization (1NF–BCNF) & ACID Concurrency',
    subject: 'Database Management Systems',
    categoryId: 'cat_cs',
    semester: 'Semester 4',
    unit: 'Unit 2 & 3 — Schema Design & Transactions',
    description:
      'Detailed university handbook on Armstrong’s axioms, canonical cover computation, lossless-join and dependency-preserving decompositions into 3NF and BCNF, B+ Tree node splitting/merging, conflict serializability precedence graphs, and Two-Phase Locking (2PL).',
    fileType: 'PDF',
    fileSize: '5.1 MB',
    pageCount: 3,
    uploadDate: '2026-10-25',
    uploaderId: 'usr_student_01',
    uploaderName: 'Aarav Mehta',
    uploaderRole: 'Class Representative',
    tags: ['BCNF', '3NF', 'Functional Dependencies', 'B+ Trees', 'ACID', 'Conflict Serializability', '2PL'],
    rating: 4.9,
    ratingCount: 64,
    viewsCount: 1580,
    downloadsCount: 590,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'db_sec_1',
        title: '1. Functional Dependencies & Normal Forms (1NF to BCNF)',
        pageNumber: 1,
        summary: 'Attribute closure X+, candidate key discovery, and lossless join decomposition tests.',
      },
      {
        id: 'db_sec_2',
        title: '2. B+ Tree Dynamic Indexing & Range Scans',
        pageNumber: 2,
        summary: 'Internal vs leaf node fanout, order p calculations, and sibling pointer range queries.',
      },
      {
        id: 'db_sec_3',
        title: '3. Transaction Serializability, 2PL & ARIES Recovery',
        pageNumber: 3,
        summary: 'Conflict equivalence, Precedence Graph cycle testing, Strict 2PL, and Write-Ahead Logging.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 2.1 — Relational Normalization & Lossless Decomposition',
        heading: 'Candidate Keys, 3NF vs BCNF & Dependency Preservation',
        paragraphs: [
          'Redundant storage in unnormalized relational schemas leads to insertion, deletion, and update anomalies. Given a set of Functional Dependencies F, the attribute closure X+ computes all attributes functionally determined by X in linear time.',
          'A relation schema R is in Boyce-Codd Normal Form (BCNF) if for every non-trivial functional dependency X → Y in F+, X is a superkey of R. While BCNF guarantees zero redundancy from functional dependencies, a BCNF decomposition is not always dependency-preserving—whereas 3NF is ALWAYS both lossless-join and dependency-preserving.',
        ],
        keyFormulaOrCode: `// Lossless Join Test for Binary Decomposition R -> (R1, R2):
Decomposition is lossless iff:
  (R1 ∩ R2) -> R1  is in F+   OR   (R1 ∩ R2) -> R2  is in F+

// 3NF Condition for non-trivial X -> A:
  X is a Superkey   OR   A is a Prime Attribute (part of some Candidate Key)`,
        diagramCaption: 'Figure 2.3: Hierarchy of Normal Forms: 1NF ⊃ 2NF ⊃ 3NF ⊃ BCNF ⊃ 4NF.',
        takeaways: [
          'Every binary relation (only 2 attributes) is automatically in BCNF.',
          'Always minimize F to its Canonical Cover Fc before running the 3NF synthesis algorithm.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 2.4 — B+ Tree Multilevel Indexing',
        heading: 'Internal Routing Keys, Leaf Linked Lists & Disk Block Fanout',
        paragraphs: [
          'Unlike B-Trees, which store data pointers in both internal and leaf nodes, B+ Trees store data pointers exclusively in leaf nodes and link all leaves sequentially via sibling pointers. This maximizes internal node fanout and enables O(log_p N + K) range queries.',
          'Given block size B, search key size K, block pointer size P, and data record pointer size Pr, internal node order p_internal and leaf node capacity p_leaf are determined by packing inequalities.',
        ],
        keyFormulaOrCode: `// Internal Node Order (p):
p * P + (p - 1) * K <= Block_Size (B)

// Leaf Node Capacity (p_leaf):
p_leaf * (K + P_record) + P_next_leaf <= Block_Size (B)`,
        diagramCaption: 'Figure 2.9: B+ Tree split propagation when inserting key 42 into a full leaf node.',
        takeaways: [
          'A 3-level B+ Tree with fanout 200 can index 8 million records requiring only 3 disk I/Os.',
        ],
      },
      {
        pageNumber: 3,
        sectionTitle: 'Unit 3.1 — Concurrency Control & Serializability',
        heading: 'Conflict Serializability Precedence Graph & Strict 2PL',
        paragraphs: [
          'Two instructions in a schedule conflict if they belong to different transactions, access the same data item Q, and at least one of them is a Write(Q). A schedule S is Conflict Serializable if and only if its Precedence (Serialization) Graph is a Directed Acyclic Graph (DAG).',
          'Basic Two-Phase Locking (2PL) guarantees conflict serializability via a Growing Phase and Shrinking Phase, but remains vulnerable to Cascading Rollbacks. Strict 2PL holds all exclusive (X) locks until commit/abort, ensuring both serializability and strict recoverability.',
        ],
        keyFormulaOrCode: `Conflict Pairs on item Q between Ti and Tj (i != j):
  1. Read_i(Q)  -> Write_j(Q)   (Edge Ti -> Tj)
  2. Write_i(Q) -> Read_j(Q)    (Edge Ti -> Tj)
  3. Write_i(Q) -> Write_j(Q)   (Edge Ti -> Tj)`,
        diagramCaption: 'Figure 3.6: Topological sort of an acyclic precedence graph yields the equivalent serial schedule.',
        takeaways: [
          'Strict 2PL prevents dirty reads and cascading aborts, though deadlocks remain possible and require wait-for graph detection or wound-wait/wait-die timestamps.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Essential guide to relational schema normalization (finding candidate keys, 3NF/BCNF decomposition), B+ Tree block fanout formulas, and testing transaction schedules for conflict serializability.',
      estimatedStudyMinutes: 40,
      examWeightageHint: 'Very High Weightage (~28% of End-Sem Paper)',
      keyPoints: [
        '3NF allows X → A if A is a prime attribute, preserving dependencies where BCNF might split them.',
        'B+ Tree leaf nodes contain all keys and are linked sequentially for rapid range scans.',
        'A schedule is conflict serializable iff its precedence graph has zero cycles.',
      ],
      autoTags: [
        { label: 'BCNF & 3NF', confidence: '99%', category: 'Schema Design' },
        { label: 'B+ Tree Fanout', confidence: '96%', category: 'Indexing' },
        { label: 'Precedence Graph', confidence: '98%', category: 'Transactions' },
      ],
      flashcards: [
        {
          id: 'fc_db_1',
          topic: 'Normalization',
          question: 'When can a relation in 3NF violate BCNF?',
          answer:
            'When there exists a functional dependency X → A where X is NOT a superkey, but A is a prime attribute (part of some candidate key).',
        },
        {
          id: 'fc_db_2',
          topic: 'Transactions',
          question: 'What additional guarantee does Strict 2PL provide over Basic 2PL?',
          answer:
            'Strict 2PL holds all exclusive (write) locks until transaction commit or abort, preventing dirty reads and guaranteeing cascadeless recoverability.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_db_1',
          question: 'Given R(A, B, C, D) with FDs { A → B, B → C, C → A }, how many candidate keys does R have?',
          options: ['1 (AD)', '2 (AD, BD)', '3 (AD, BD, CD)', '4 (A, B, C, D)'],
          correctIndex: 2,
          explanation:
            'Since D never appears on the RHS of any FD, D must be in every candidate key. Because A, B, and C determine each other in a cycle, AD, BD, and CD all have closure {A,B,C,D}.',
        },
      ],
      examPrepChecklist: [
        'Compute attribute closures and candidate keys for 5 practice FD sets.',
        'Draw precedence graphs for 3-transaction interleaved schedules.',
      ],
    },
  },
  {
    id: 'note_dsa_04',
    title: 'Data Structures & Algorithms: Graph Shortest Paths, AVL/Red-Black Trees & Dynamic Programming',
    subject: 'Data Structures & Algorithms',
    categoryId: 'cat_prog',
    semester: 'Semester 3',
    unit: 'Unit 4 & 5 — Non-Linear Structures & DP',
    description:
      'Rigorous problem-solving compendium covering AVL tree rotations (LL, RR, LR, RL), Dijkstra vs Bellman-Ford vs Floyd-Warshall asymptotic tradeoffs, Minimum Spanning Trees (Kruskal Union-Find & Prim), and 0/1 Knapsack, LCS, and Matrix Chain Multiplication DP tables.',
    fileType: 'PDF',
    fileSize: '4.6 MB',
    pageCount: 3,
    uploadDate: '2026-10-22',
    uploaderId: 'usr_student_03',
    uploaderName: 'Kabir Verma',
    uploaderRole: 'Student',
    tags: ['Dynamic Programming', 'Graphs', 'Dijkstra', 'AVL Trees', 'Union-Find', 'Complexity'],
    rating: 4.9,
    ratingCount: 72,
    viewsCount: 2140,
    downloadsCount: 830,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'dsa_sec_1',
        title: '1. Balanced BSTs: AVL Rotations & Red-Black Invariants',
        pageNumber: 1,
        summary: 'Balance factor {-1, 0, +1}, O(1) pointer restructuring, and height bounds.',
      },
      {
        id: 'dsa_sec_2',
        title: '2. Shortest Paths & Minimum Spanning Trees',
        pageNumber: 2,
        summary: 'Greedy choice in Dijkstra/Prim, negative weight cycles in Bellman-Ford, and Disjoint Set Union.',
      },
      {
        id: 'dsa_sec_3',
        title: '3. Dynamic Programming: Overlapping Subproblems & Tabulation',
        pageNumber: 3,
        summary: 'Recurrence equations for 0/1 Knapsack, Longest Common Subsequence, and Edit Distance.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 4.1 — Self-Balancing Binary Search Trees',
        heading: 'AVL Balance Factors & Single/Double Rotation Repairs',
        paragraphs: [
          'An AVL tree enforces that for every internal node v, the height difference (Balance Factor) between its left and right subtrees satisfies |h(L) - h(R)| ≤ 1. This guarantees worst-case tree height h < 1.44 log2(n + 2), keeping search, insertion, and deletion strictly O(log n).',
          'When an insertion causes a node’s balance factor to become +2 or -2, local structural balance is restored using either a Single Rotation (LL or RR) or a Double Rotation (LR or RL) requiring O(1) pointer updates.',
        ],
        keyFormulaOrCode: `Balance_Factor(node) = Height(node.left) - Height(node.right)

// Minimum nodes N(h) in an AVL tree of height h:
N(h) = N(h - 1) + N(h - 2) + 1   (Fibonacci-like growth)`,
        diagramCaption: 'Figure 4.1: LR Double Rotation decomposed into Left-Rotate(child) followed by Right-Rotate(parent).',
        takeaways: [
          'AVL Insertion requires at most 1 rotation (single or double) to rebalance the entire tree; AVL Deletion may require O(log n) rotations up to the root.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 4.3 — Graph Shortest Path & MST Paradigms',
        heading: 'Dijkstra, Bellman-Ford & Floyd-Warshall Comparison',
        paragraphs: [
          'Dijkstra’s algorithm greedily extracts the unvisited vertex u with minimum d[u] using a min-priority queue in O((V + E) log V) time, assuming all edge weights w(u,v) ≥ 0. If negative edge weights exist, Dijkstra fails because adding a negative edge later can reduce a previously finalized path.',
          'Bellman-Ford relaxes all E edges V - 1 times in O(V × E) time and detects reachable negative-weight cycles on the V-th pass.',
        ],
        keyFormulaOrCode: `// Edge Relaxation Step (u -> v with weight w):
if (dist[u] + w < dist[v]) {
    dist[v] = dist[u] + w;
    parent[v] = u;
}`,
        diagramCaption: 'Table 4.2: Kruskal’s MST runs in O(E log E) using Disjoint-Set path compression and union by rank.',
        takeaways: [
          'If a graph has distinct edge weights, its Minimum Spanning Tree (MST) is guaranteed to be unique.',
        ],
      },
      {
        pageNumber: 3,
        sectionTitle: 'Unit 5.1 — Dynamic Programming State Transitions',
        heading: 'Optimal Substructure in 0/1 Knapsack & Longest Common Subsequence',
        paragraphs: [
          'Unlike Greedy algorithms (which solve Fractional Knapsack in O(n log n)), the 0/1 Knapsack problem exhibits overlapping subproblems where each item i must be taken whole or left behind.',
          'Longest Common Subsequence (LCS) compares prefixes X[1..i] and Y[1..j] in O(m × n) time and can be space-optimized to O(min(m, n)) using two rolling rows.',
        ],
        keyFormulaOrCode: `// 0/1 Knapsack State Transition:
dp[i][w] = max(
    dp[i - 1][w],                          // Exclude item i
    val[i] + dp[i - 1][w - wt[i]]          // Include item i (if wt[i] <= w)
);

// Longest Common Subsequence (LCS):
if (X[i] == Y[j]) dp[i][j] = 1 + dp[i - 1][j - 1];
else              dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);`,
        diagramCaption: 'Figure 5.3: Backtracking arrows in an LCS dynamic programming table.',
        takeaways: [
          '0/1 Knapsack runs in O(n × W) pseudo-polynomial time because W is exponential in the bit-length of the input capacity.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Synthesizes self-balancing search trees, graph shortest-path algorithms, and classic Dynamic Programming recurrences with time/space complexity derivations.',
      estimatedStudyMinutes: 45,
      examWeightageHint: 'High Weightage (~30% of End-Sem Paper)',
      keyPoints: [
        'AVL insertion needs at most 1 rotation; deletion may propagate O(log n) rotations.',
        'Dijkstra requires non-negative weights; Bellman-Ford handles negative weights in O(VE).',
        '0/1 Knapsack time complexity O(nW) is pseudo-polynomial.',
      ],
      autoTags: [
        { label: 'Dynamic Programming', confidence: '99%', category: 'Paradigm' },
        { label: 'Graph Algorithms', confidence: '98%', category: 'Structures' },
        { label: 'AVL Rotations', confidence: '95%', category: 'Trees' },
      ],
      flashcards: [
        {
          id: 'fc_dsa_1',
          topic: 'Graph Theory',
          question: 'Why does Dijkstra’s Algorithm fail on graphs with negative edge weights?',
          answer:
            'Dijkstra assumes that once a vertex u with minimum distance is extracted from the priority queue, no future path through unvisited vertices can ever produce a shorter path to u—an invariant violated by negative edges.',
        },
        {
          id: 'fc_dsa_2',
          topic: 'Complexity',
          question: 'Why is O(n × W) for 0/1 Knapsack considered pseudo-polynomial rather than polynomial?',
          answer:
            'Because capacity W is a numeric value encoded in k = log2(W) bits, so W = 2^k grows exponentially with the input size in bits.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_dsa_1',
          question: 'What is the maximum number of rotations required to rebalance an AVL tree after a single key insertion?',
          options: ['1 (Single or Double rotation)', '2 rotations', 'O(log n) rotations', 'O(n) rotations'],
          correctIndex: 0,
          explanation: 'A single or double rotation at the lowest unbalanced ancestor restores the height of that subtree to its pre-insertion height.',
        },
      ],
      examPrepChecklist: [
        'Insert sequence [30, 20, 10, 25, 28, 27] into an empty AVL tree and label each rotation.',
        'Fill out the 2D LCS table for strings "EXPONENTIAL" and "POLYNOMIAL".',
      ],
    },
  },
  {
    id: 'note_math_05',
    title: 'Linear Algebra: Eigenvalues, Diagonalization, Singular Value Decomposition & Orthogonality',
    subject: 'Linear Algebra & Matrix Theory',
    categoryId: 'cat_math',
    semester: 'Semester 3',
    unit: 'Unit 3 — Spectral Theory & SVD',
    description:
      'Step-by-step mathematical derivations of the Fundamental Theorem of Linear Algebra (Four Fundamental Subspaces), Gram-Schmidt orthonormalization, characteristic polynomials, algebraic vs geometric multiplicity, Cayley-Hamilton Theorem, and Singular Value Decomposition (A = UΣV^T).',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    pageCount: 2,
    uploadDate: '2026-10-20',
    uploaderId: 'usr_student_04',
    uploaderName: 'Ananya Nair',
    uploaderRole: 'Student',
    tags: ['Eigenvalues', 'SVD', 'Gram-Schmidt', 'Rank-Nullity', 'Orthogonal Projections', 'Matrices'],
    rating: 4.7,
    ratingCount: 31,
    viewsCount: 840,
    downloadsCount: 295,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'math_sec_1',
        title: '1. Four Subspaces, Rank-Nullity & Gram-Schmidt',
        pageNumber: 1,
        summary: 'Column space, null space, orthogonal projections P = A(A^T A)^(-1) A^T, and least squares.',
      },
      {
        id: 'math_sec_2',
        title: '2. Spectral Theorem & Singular Value Decomposition',
        pageNumber: 2,
        summary: 'Det(A - λI) = 0, symmetric matrices A = QΛQ^T, and low-rank SVD approximation.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 3.1 — Fundamental Subspaces & Least Squares',
        heading: 'Rank-Nullity Theorem & Orthogonal Projection Matrices',
        paragraphs: [
          'For any m × n real matrix A of rank r, the Row Space C(A^T) and Null Space N(A) are orthogonal complements in R^n, satisfying dim C(A) + dim N(A) = n. When Ax = b has no exact solution (b lies outside C(A)), the ordinary least-squares estimator x̂ minimizes ||Ax - b||₂² by projecting b orthogonally onto C(A).',
        ],
        keyFormulaOrCode: `// Normal Equations for Least Squares:
A^T A x_hat = A^T b

// Gram-Schmidt Orthonormalization:
u_k = v_k - Σ_{j=1}^{k-1} ( <v_k, q_j> ) q_j,    q_k = u_k / ||u_k||`,
        diagramCaption: 'Figure 3.1: Orthogonal decomposition of R^n into Row Space and Null Space.',
        takeaways: [
          'Trace(A) equals the sum of all eigenvalues Σ λ_i; Determinant(A) equals the product of all eigenvalues Π λ_i.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 3.2 — Eigen-Decomposition & SVD',
        heading: 'Diagonalization Criteria & Singular Value Decomposition',
        paragraphs: [
          'An n × n matrix A is diagonalizable (A = PDP⁻¹) if and only if it possesses n linearly independent eigenvectors—equivalently, the geometric multiplicity equals the algebraic multiplicity for every eigenvalue λ.',
          'Every real m × n matrix A admits a Singular Value Decomposition A = U Σ V^T, where U (m × m) and V (n × n) are orthogonal matrices and Σ contains non-negative singular values σ₁ ≥ σ₂ ≥ ... ≥ σ_r > 0 equal to the square roots of the non-zero eigenvalues of A^T A.',
        ],
        keyFormulaOrCode: `Characteristic Equation: det(A - λI) = 0
Spectral Theorem (Real Symmetric A = A^T): A = Q Λ Q^T (with orthogonal Q)
SVD Factorization: A = U Σ V^T = Σ_{i=1}^r σ_i u_i v_i^T`,
        diagramCaption: 'Figure 3.4: Geometric view of SVD: Rotation (V^T) → Axis Scaling (Σ) → Rotation (U).',
        takeaways: [
          'Real symmetric matrices always have real eigenvalues and orthogonal eigenvectors, making them unconditionally diagonalizable.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Focused review of Rank-Nullity, Least Squares normal equations, eigenvalue diagonalizability tests, and SVD factorization.',
      estimatedStudyMinutes: 25,
      examWeightageHint: 'High Weightage (~25% of End-Sem Paper)',
      keyPoints: [
        'Sum of eigenvalues = Trace(A); Product of eigenvalues = det(A).',
        'A matrix is diagonalizable iff geometric multiplicity equals algebraic multiplicity for every eigenvalue.',
        'Singular values σ_i are the square roots of the eigenvalues of A^T A.',
      ],
      autoTags: [
        { label: 'Spectral Theory', confidence: '98%', category: 'Pure Math' },
        { label: 'SVD & PCA', confidence: '95%', category: 'Applied Linear Algebra' },
      ],
      flashcards: [
        {
          id: 'fc_math_1',
          topic: 'Eigenvalues',
          question: 'If a 3×3 matrix A has eigenvalues 2, -3, and 5, what are Trace(A) and det(A)?',
          answer: 'Trace(A) = 2 + (-3) + 5 = 4. Determinant det(A) = 2 × (-3) × 5 = -30.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_math_1',
          question: 'For a 5×7 matrix A with rank 4, what is the dimension of its Null Space N(A)?',
          options: ['1', '2', '3', '4'],
          correctIndex: 2,
          explanation: 'By Rank-Nullity: Rank(A) + Nullity(A) = number of columns (7). Thus Nullity(A) = 7 - 4 = 3.',
        },
      ],
      examPrepChecklist: [
        'Diagonalize a 3×3 matrix with a repeated eigenvalue.',
        'Perform Gram-Schmidt on 3 linearly independent vectors in R³.',
      ],
    },
  },
  {
    id: 'note_se_06',
    title: 'Software Engineering: Agile Architecture, Design Patterns, Testing & CI/CD Pipelines',
    subject: 'Software Engineering',
    categoryId: 'cat_eng',
    semester: 'Semester 6',
    unit: 'Unit 2 & 4 — Architecture & Quality Assurance',
    description:
      'Complete reference covering Scrum vs Kanban velocity metrics, SOLID object-oriented principles, Gang of Four (GoF) Design Patterns (Singleton, Factory, Observer, Strategy), Cyclomatic Complexity white-box testing, Boundary Value Analysis, and automated CI/CD deployment strategies.',
    fileType: 'DOCX',
    fileSize: '2.4 MB',
    pageCount: 2,
    uploadDate: '2026-10-19',
    uploaderId: 'usr_student_05',
    uploaderName: 'Devansh Kulkarni',
    uploaderRole: 'Student',
    tags: ['SOLID', 'Design Patterns', 'Cyclomatic Complexity', 'Agile Scrum', 'Unit Testing', 'Microservices'],
    rating: 4.6,
    ratingCount: 27,
    viewsCount: 690,
    downloadsCount: 210,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'se_sec_1',
        title: '1. SOLID Principles & GoF Design Patterns',
        pageNumber: 1,
        summary: 'Dependency Inversion, Open-Closed principle, Strategy vs Observer UML structures.',
      },
      {
        id: 'se_sec_2',
        title: '2. McCabe Cyclomatic Complexity & Black-Box Testing',
        pageNumber: 2,
        summary: 'Control Flow Graphs V(G) = E - N + 2P, Equivalence Partitioning, and Boundary Value Analysis.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 2.2 — Architectural Patterns & SOLID Design',
        heading: 'Low Coupling, High Cohesion & Behavioral Design Patterns',
        paragraphs: [
          'Maintainable software architectures maximize intra-module cohesion while minimizing inter-module coupling. The Dependency Inversion Principle dictates that high-level policy modules must not depend on low-level implementation details; both should depend on abstractions (interfaces).',
        ],
        keyFormulaOrCode: `// Strategy Pattern Interface Decoupling:
interface CompressionStrategy {
  compress(payload: Uint8Array): Uint8Array;
}
// Context delegates algorithm execution without conditional branching.`,
        diagramCaption: 'Figure 2.4: Coupling spectrum from Content Coupling (worst) to Data Coupling (best).',
        takeaways: [
          'Favor object composition over deep class inheritance hierarchies to maintain runtime flexibility.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 4.1 — Verification, Validation & Cyclomatic Complexity',
        heading: 'Basis Path Testing & McCabe’s Metric V(G)',
        paragraphs: [
          'Verification checks "Are we building the product right?" (against specifications), whereas Validation checks "Are we building the right product?" (against user needs). McCabe’s Cyclomatic Complexity V(G) quantifies the number of linearly independent execution paths through a program’s Control Flow Graph (CFG), providing an exact upper bound on the minimum number of test cases needed for 100% branch coverage.',
        ],
        keyFormulaOrCode: `// Three Equivalent Formulas for Cyclomatic Complexity V(G):
1. V(G) = E - N + 2P   (Edges E, Nodes N, Connected Components P = 1)
2. V(G) = Π + 1        (where Π is the number of predicate decision nodes)
3. V(G) = Number of enclosed regions in planar CFG + 1`,
        diagramCaption: 'Table 4.1: Modules with V(G) > 10 should be refactored into smaller testable functions.',
        takeaways: [
          'Boundary Value Analysis (BVA) tests min, min+1, nominal, max-1, and max (4n + 1 test cases for n variables).',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Distills SOLID architecture, GoF behavioral/creational design patterns, and McCabe’s Cyclomatic Complexity formulas for white-box testing.',
      estimatedStudyMinutes: 20,
      examWeightageHint: 'Medium-High Weightage (~18% of End-Sem Paper)',
      keyPoints: [
        'Cyclomatic Complexity V(G) = E − N + 2P = Predicate Nodes + 1.',
        'High Cohesion + Loose Coupling is the gold standard of modular design.',
      ],
      autoTags: [
        { label: 'Software Testing', confidence: '97%', category: 'QA' },
        { label: 'Design Patterns', confidence: '96%', category: 'Architecture' },
      ],
      flashcards: [
        {
          id: 'fc_se_1',
          topic: 'Software Testing',
          question: 'If a function contains 4 if-else decision predicates and 1 while loop, what is its Cyclomatic Complexity V(G)?',
          answer: 'Total predicate nodes Π = 4 + 1 = 5. Therefore V(G) = Π + 1 = 6 independent basis paths.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_se_1',
          question: 'A Control Flow Graph has 14 edges and 11 nodes (1 connected component). What is V(G)?',
          options: ['3', '4', '5', '6'],
          correctIndex: 2,
          explanation: 'V(G) = E - N + 2 = 14 - 11 + 2 = 5.',
        },
      ],
      examPrepChecklist: [
        'Draw UML class diagrams for Observer, Factory Method, and Singleton.',
        'Calculate V(G) for a sample binary search procedure.',
      ],
    },
  },
  {
    id: 'note_dl_07',
    title: 'Digital Logic & Computer Organization: K-Maps, Sequential Circuits & 5-Stage RISC Pipeline',
    subject: 'Digital Logic & Computer Organization',
    categoryId: 'cat_eng',
    semester: 'Semester 3',
    unit: 'Unit 2 & 5 — Combinational Logic & Pipelining',
    description:
      'Detailed visual notes with 4-variable Karnaugh Map implicant minimization, Quine-McCluskey tabular method, JK/D/T Flip-Flop excitation tables, synchronous counter synthesis, Cache Direct/Associative mapping, and RISC-V 5-stage pipeline data & control hazards.',
    fileType: 'PDF',
    fileSize: '3.9 MB',
    pageCount: 2,
    uploadDate: '2026-10-16',
    uploaderId: 'usr_prof_02',
    uploaderName: 'Riya Sharma',
    uploaderRole: 'Teaching Assistant',
    tags: ['Karnaugh Maps', 'Flip-Flops', 'RISC Pipeline', 'Cache Memory', 'Data Hazards', 'Boolean Algebra'],
    rating: 4.8,
    ratingCount: 41,
    viewsCount: 910,
    downloadsCount: 340,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'dl_sec_1',
        title: '1. K-Map Prime Implicants & Flip-Flop Excitation Tables',
        pageNumber: 1,
        summary: 'SOP/POS minimization, don’t-care conditions, and race-around elimination in Master-Slave JK.',
      },
      {
        id: 'dl_sec_2',
        title: '2. Cache Organization & 5-Stage Instruction Pipelining',
        pageNumber: 2,
        summary: 'IF-ID-EX-MEM-WB stages, Operand Forwarding, Load-Use stalls, and Set-Associative tag bits.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 2.1 — Combinational & Sequential Logic Synthesis',
        heading: 'Essential Prime Implicants & Flip-Flop Characteristic Equations',
        paragraphs: [
          'Karnaugh maps arrange truth-table minterms in Gray code order so adjacent cells differ by a single complemented literal. Grouping powers-of-two octets, quads, and pairs eliminates changing variables. In sequential circuits, JK flip-flops eliminate the invalid S=R=1 state of SR latches by toggling Q(t+1) = Q’(t) when J=K=1.',
        ],
        keyFormulaOrCode: `// Flip-Flop Characteristic Equations:
D  Flip-Flop : Q(t+1) = D
T  Flip-Flop : Q(t+1) = T ⊕ Q(t)
JK Flip-Flop : Q(t+1) = J·Q'(t) + K'·Q(t)`,
        diagramCaption: 'Figure 2.2: 4-variable K-Map wrap-around corner adjacency.',
        takeaways: [
          'Race-around condition in level-triggered JK flip-flops occurs when clock pulse width tp > propagation delay Δt; solved by Edge Triggering or Master-Slave configuration.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 5.1 — RISC Pipelining & Cache Address Partitioning',
        heading: 'RAW Data Hazards, Forwarding Paths & Set-Associative Cache',
        paragraphs: [
          'A classic 5-stage RISC pipeline overlaps Instruction Fetch (IF), Decode (ID), Execute (EX), Memory (MEM), and Write-Back (WB). Read-After-Write (RAW) true data dependencies between consecutive ALU instructions are resolved without stalls via hardware Operand Forwarding from EX/MEM or MEM/WB pipeline buffers.',
        ],
        keyFormulaOrCode: `// k-Way Set-Associative Cache Address Split:
| <--- Tag Bits ---> | <--- Set Index = log2(Sets) ---> | <--- Byte Offset = log2(Block_Size) ---> |

// Pipeline Speedup with Stall Cycles per Instruction:
Speedup = Ideal_CPI_Unpipelined / (1 + Stall_Frequency × Stall_Cycles)`,
        diagramCaption: 'Figure 5.4: Load-Use hazard requires 1 bubble stall even with EX-to-EX forwarding.',
        takeaways: [
          'A Load instruction followed immediately by an ALU instruction that reads the loaded register always incurs a 1-cycle stall in a 5-stage pipeline.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Covers Boolean minimization, flip-flop state equations, cache tag/index/offset bit calculations, and 5-stage pipeline hazard stalls.',
      estimatedStudyMinutes: 30,
      examWeightageHint: 'High Weightage (~24% of End-Sem Paper)',
      keyPoints: [
        'JK characteristic equation: Q(t+1) = JQ’ + K’Q.',
        'Set index bits = log2(Number of Cache Lines / Associativity k).',
        'RAW hazards are true dependencies; WAR and WAW are name dependencies solved by register renaming.',
      ],
      autoTags: [
        { label: 'Computer Architecture', confidence: '99%', category: 'Hardware' },
        { label: 'Cache Memory', confidence: '96%', category: 'Memory Hierarchy' },
      ],
      flashcards: [
        {
          id: 'fc_dl_1',
          topic: 'Cache Memory',
          question: 'A 64 KB 4-way set-associative cache has 64-byte blocks and 32-bit physical addresses. How many bits are in the Tag field?',
          answer:
            'Block offset = log2(64) = 6 bits. Total lines = 64KB / 64B = 1024. Sets = 1024 / 4 = 256 -> Index = log2(256) = 8 bits. Tag = 32 - 8 - 6 = 18 bits.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_dl_1',
          question: 'Which data hazard is a true dependency that cannot be resolved solely by register renaming?',
          options: ['Read After Write (RAW)', 'Write After Read (WAR)', 'Write After Write (WAW)', 'Read After Read (RAR)'],
          correctIndex: 0,
          explanation: 'RAW is a true flow dependency because the consumer instruction genuinely needs the value computed by the producer.',
        },
      ],
      examPrepChecklist: [
        'Design a Mod-6 synchronous counter using T flip-flops.',
        'Calculate Tag, Index, and Offset bits for Direct, 4-Way, and Fully Associative caches.',
      ],
    },
  },
  {
    id: 'note_dm_08',
    title: 'Discrete Mathematics: Propositional Logic, Recurrence Relations, Graph Theory & Combinatorics',
    subject: 'Discrete Mathematics',
    categoryId: 'cat_math',
    semester: 'Semester 3',
    unit: 'Unit 1 & 4 — Combinatorics & Graph Theory',
    description:
      'Crystal-clear lecture notes and solved problem sets on Pigeonhole Principle, Principle of Inclusion-Exclusion, Generating Functions, Master Theorem for divide-and-conquer recurrences, Eulerian & Hamiltonian circuits, and Planar Graphs (Kuratowski’s Theorem & Euler’s Formula V - E + F = 2).',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    pageCount: 2,
    uploadDate: '2026-10-14',
    uploaderId: 'usr_student_04',
    uploaderName: 'Ananya Nair',
    uploaderRole: 'Student',
    tags: ['Graph Theory', 'Recurrence Relations', 'Master Theorem', 'Planar Graphs', 'Pigeonhole', 'Logic'],
    rating: 4.8,
    ratingCount: 35,
    viewsCount: 760,
    downloadsCount: 280,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'dm_sec_1',
        title: '1. Solving Linear Homogeneous Recurrences & Master Theorem',
        pageNumber: 1,
        summary: 'Characteristic roots, repeated multiplicity, and asymptotic divide-and-conquer bounds.',
      },
      {
        id: 'dm_sec_2',
        title: '2. Eulerian/Hamiltonian Graphs & Planar Graph Inequalities',
        pageNumber: 2,
        summary: 'Handshaking Lemma, Euler’s formula V - E + F = 2, and chromatic numbers.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 2.3 — Recurrence Relations & Generating Functions',
        heading: 'Characteristic Equations & Master Theorem Cases',
        paragraphs: [
          'A linear homogeneous recurrence relation of degree k with constant coefficients is solved by substituting a_n = r^n to obtain its characteristic polynomial. If a characteristic root r₁ has multiplicity m, its general solution contribution is (c₁ + c₂n + ... + c_m n^(m-1)) r₁^n.',
        ],
        keyFormulaOrCode: `// Master Theorem for T(n) = a T(n/b) + f(n) where a >= 1, b > 1:
Let c_crit = log_b(a).
Case 1: f(n) = O(n^(c_crit - ε))         => T(n) = Θ(n^c_crit)
Case 2: f(n) = Θ(n^c_crit · log^k n)     => T(n) = Θ(n^c_crit · log^(k+1) n)
Case 3: f(n) = Ω(n^(c_crit + ε))         => T(n) = Θ(f(n))`,
        diagramCaption: 'Table 2.1: Common recurrence solutions for Merge Sort, Binary Search, and Strassen’s Matrix Multiplication.',
        takeaways: [
          'Total number of derangements D_n of n items where no element appears in its original position approaches n! / e.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 4.2 — Graph Invariants & Planarity',
        heading: 'Handshaking Lemma, Eulerian Trails & Kuratowski’s Theorem',
        paragraphs: [
          'In any undirected graph G = (V, E), the sum of vertex degrees equals 2|E|, implying the number of odd-degree vertices is always even. A connected undirected graph possesses an Eulerian circuit if and only if every vertex has even degree.',
        ],
        keyFormulaOrCode: `Handshaking Lemma : Σ_{v ∈ V} deg(v) = 2|E|
Euler's Planar Formula (connected planar graph): V - E + F = 2
Planarity Edge Bound (V >= 3): E <= 3V - 6  (and E <= 2V - 4 if bipartite/triangle-free)`,
        diagramCaption: 'Figure 4.5: Non-planar graphs K₅ ( violates E ≤ 3V - 6 ) and K_{3,3} ( violates E ≤ 2V - 4 ).',
        takeaways: [
          'By the Four-Color Theorem, every planar graph is 4-vertex-colorable (χ(G) ≤ 4).',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Rapid revision guide for recurrence relations, Master Theorem asymptotic bounds, and planar graph inequalities.',
      estimatedStudyMinutes: 25,
      examWeightageHint: 'High Weightage (~22% of End-Sem Paper)',
      keyPoints: [
        'Euler’s formula for connected planar graphs with c components: V − E + F = c + 1.',
        'K₅ fails E ≤ 3V − 6 (10 > 9); K₃,₃ is triangle-free and fails E ≤ 2V − 4 (9 > 8).',
      ],
      autoTags: [
        { label: 'Combinatorics', confidence: '98%', category: 'Mathematics' },
        { label: 'Graph Planarity', confidence: '96%', category: 'Discrete Structures' },
      ],
      flashcards: [
        {
          id: 'fc_dm_1',
          topic: 'Graph Theory',
          question: 'What is the necessary and sufficient condition for a connected undirected graph to have an Eulerian trail (path) that is NOT a circuit?',
          answer: 'The graph must have capacities where exactly two vertices have odd degree (which serve as the start and end vertices of the trail).',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_dm_1',
          question: 'A connected planar graph has 10 vertices, each of degree 3. Into how many regions (faces) does this planar embedding divide the plane?',
          options: ['5 faces', '6 faces', '7 faces', '8 faces'],
          correctIndex: 2,
          explanation: 'Sum of degrees = 10 × 3 = 30 = 2E => E = 15. By V - E + F = 2: 10 - 15 + F = 2 => F = 7.',
        },
      ],
      examPrepChecklist: [
        'Solve non-homogeneous recurrence a_n - 5a_{n-1} + 6a_{n-2} = 2^n.',
        'Verify Eulerian vs Hamiltonian properties on Petersen and Hypercube Q₃ graphs.',
      ],
    },
  },
  {
    id: 'note_phys_09',
    title: 'Engineering Physics: Quantum Mechanics, Schrödinger Wave Equation & Semiconductor Band Theory',
    subject: 'Engineering Physics',
    categoryId: 'cat_sci',
    semester: 'Semester 2',
    unit: 'Unit 3 & 4 — Quantum & Solid State Physics',
    description:
      'Derivations of de Broglie matter waves, Heisenberg Uncertainty Principle, time-independent Schrödinger equation for a 1D infinite potential well, Fermi-Dirac distribution, Hall Effect coefficient derivation, and PN-junction diode depletion width physics.',
    fileType: 'PDF',
    fileSize: '3.6 MB',
    pageCount: 2,
    uploadDate: '2026-10-11',
    uploaderId: 'usr_student_06',
    uploaderName: 'Meera Krishnan',
    uploaderRole: 'Student',
    tags: ['Quantum Mechanics', 'Schrödinger Equation', 'Semiconductors', 'Hall Effect', 'Fermi Level'],
    rating: 4.7,
    ratingCount: 22,
    viewsCount: 540,
    downloadsCount: 175,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'ph_sec_1',
        title: '1. Particle in a 1D Infinite Potential Box',
        pageNumber: 1,
        summary: 'Quantized energy eigenvalues E_n and normalized wavefunctions ψ_n(x).',
      },
      {
        id: 'ph_sec_2',
        title: '2. Intrinsic/Extrinsic Semiconductors & Hall Effect',
        pageNumber: 2,
        summary: 'Law of Mass Action n·p = n_i², Fermi energy shift, and Hall voltage mobility measurement.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 3.2 — Wave Mechanics & Bound States',
        heading: '1D Infinite Potential Well Energy Quantization',
        paragraphs: [
          'For a quantum particle of mass m confined strictly within 0 ≤ x ≤ L where V(x) = 0 inside and V = ∞ outside, boundary conditions require the wavefunction ψ(x) to vanish at x = 0 and x = L. This restricts the wavevector k_n = nπ / L and yields discrete energy levels proportional to n².',
        ],
        keyFormulaOrCode: `Normalized Eigenfunction : ψ_n(x) = sqrt(2 / L) · sin(n π x / L)
Quantized Energy Levels  : E_n = (n² h²) / (8 m L²),   n = 1, 2, 3, ...`,
        diagramCaption: 'Figure 3.2: Probability density |ψ_n(x)|² for n = 1, 2, 3 showing nodes and antinodes.',
        takeaways: [
          'Zero-point energy (n = 1) is strictly non-zero in accordance with Heisenberg’s Uncertainty Principle Δx · Δp ≥ ℏ/2.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 4.1 — Carrier Transport & Hall Effect',
        heading: 'Fermi Level Position & Hall Coefficient R_H',
        paragraphs: [
          'In thermal equilibrium, the product of electron concentration n and hole concentration p equals n_i² regardless of doping (Law of Mass Action). When a current-carrying semiconductor slab is placed in a transverse magnetic field B_z, the Lorentz force deflects charge carriers, establishing a measurable Hall electric field E_H.',
        ],
        keyFormulaOrCode: `Law of Mass Action : n · p = n_i²
Hall Coefficient   : R_H = -1 / (n · e)   (for n-type)   |   R_H = +1 / (p · e)   (for p-type)
Carrier Mobility   : μ = σ · |R_H|`,
        diagramCaption: 'Figure 4.4: Hall voltage polarity distinguishes n-type from p-type semiconductors.',
        takeaways: [
          'The sign of the Hall Voltage directly reveals whether majority carriers are electrons (negative) or holes (positive).',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Covers 1D quantum box derivations, Fermi-Dirac probability, Law of Mass Action, and Hall Effect experimental equations.',
      estimatedStudyMinutes: 20,
      examWeightageHint: 'Medium Weightage (~18% of End-Sem Paper)',
      keyPoints: [
        'Ground state energy E₁ = h² / (8mL²); excited states scale as E_n = n² E₁.',
        'Hall coefficient R_H gives both majority carrier type (via sign) and carrier concentration.',
      ],
      autoTags: [
        { label: 'Quantum Physics', confidence: '98%', category: 'Science' },
        { label: 'Semiconductors', confidence: '97%', category: 'Solid State' },
      ],
      flashcards: [
        {
          id: 'fc_ph_1',
          topic: 'Quantum Box',
          question: 'If the width L of a 1D infinite potential well is halved, how does the ground-state energy E₁ change?',
          answer: 'Since E_n is inversely proportional to L², halving L increases E₁ by a factor of 4.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_ph_1',
          question: 'At what position x inside a 1D box [0, L] is the probability of finding a particle in its first excited state (n = 2) zero?',
          options: ['x = L / 4', 'x = L / 2', 'x = 3L / 4', 'Nowhere inside the box'],
          correctIndex: 1,
          explanation: 'For n = 2, sin(2πx / L) = 0 at x = L / 2, creating a node at the center of the well.',
        },
      ],
      examPrepChecklist: [
        'Derive the 1D Schrödinger equation energy eigenvalues step by step.',
        'Solve 3 numerical problems on Hall Voltage and mobility.',
      ],
    },
  },
  {
    id: 'note_biz_10',
    title: 'Engineering Economics & Accounting: Time Value of Money, NPV, IRR & Financial Statements',
    subject: 'Financial & Managerial Accounting',
    categoryId: 'cat_biz',
    semester: 'Semester 6',
    unit: 'Unit 2 & 3 — Capital Budgeting & Ratios',
    description:
      'Concise slide deck and worked case studies on Discounted Cash Flow (DCF), Net Present Value (NPV) vs Internal Rate of Return (IRR), Break-Even Cost-Volume-Profit (CVP) analysis, depreciation schedules (Straight-Line vs Declining Balance), and Balance Sheet / Liquidity ratios.',
    fileType: 'PPTX',
    fileSize: '2.9 MB',
    pageCount: 2,
    uploadDate: '2026-10-08',
    uploaderId: 'usr_student_05',
    uploaderName: 'Devansh Kulkarni',
    uploaderRole: 'Student',
    tags: ['NPV & IRR', 'Capital Budgeting', 'Break-Even Analysis', 'Balance Sheet', 'Depreciation', 'Economics'],
    rating: 4.6,
    ratingCount: 19,
    viewsCount: 470,
    downloadsCount: 155,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'biz_sec_1',
        title: '1. Capital Budgeting: NPV, IRR & Payback Period',
        pageNumber: 1,
        summary: 'Discounting future cash flows, WACC hurdle rates, and mutually exclusive project selection.',
      },
      {
        id: 'biz_sec_2',
        title: '2. Break-Even CVP & Financial Ratio Analysis',
        pageNumber: 2,
        summary: 'Contribution margin ratio, Current vs Quick Ratio, ROE, and working capital cycle.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 2.1 — Discounted Cash Flow & Project Valuation',
        heading: 'Net Present Value (NPV) vs Internal Rate of Return (IRR)',
        paragraphs: [
          'Net Present Value (NPV) discounts all future incremental cash inflows C_t back to t = 0 using the firm’s cost of capital r and subtracts initial capex C₀. For mutually exclusive engineering projects of differing scales, NPV is strictly preferred over IRR because NPV assumes reinvestment at the realistic cost of capital r.',
        ],
        keyFormulaOrCode: `NPV = -C_0 + Σ_{t=1}^T [ C_t / (1 + r)^t ]
IRR = Discount rate r* such that NPV(r*) = 0`,
        diagramCaption: 'Figure 2.1: NPV Profile crossover rate between two mutually exclusive capital projects.',
        takeaways: [
          'Accept independent projects when NPV > 0 (equivalently IRR > hurdle rate r).',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 3.2 — Cost-Volume-Profit & Liquidity Ratios',
        heading: 'Contribution Margin, Break-Even Volume & Acid-Test Ratio',
        paragraphs: [
          'Break-Even Point (BEP) in units identifies the exact production volume where Total Revenue equals Fixed Costs plus Variable Costs. Liquidity ratios measure an organization’s ability to meet short-term obligations without liquidating long-term operating assets.',
        ],
        keyFormulaOrCode: `Break-Even Units (Q_BEP) = Fixed_Costs / (Selling_Price_Per_Unit - Variable_Cost_Per_Unit)
Current Ratio            = Current_Assets / Current_Liabilities
Quick (Acid-Test) Ratio  = (Current_Assets - Inventory) / Current_Liabilities`,
        diagramCaption: 'Table 3.1: Key DuPont Return on Equity (ROE) decomposition into Profit Margin × Asset Turnover × Leverage.',
        takeaways: [
          'Quick Ratio excludes inventory because inventory is the least liquid current asset and may suffer markdown losses.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Covers engineering project valuation (NPV, IRR, Payback), break-even unit economics, and financial statement ratio analysis.',
      estimatedStudyMinutes: 20,
      examWeightageHint: 'Medium Weightage (~20% of End-Sem Paper)',
      keyPoints: [
        'When NPV and IRR conflict on mutually exclusive projects, always choose the project with higher positive NPV.',
        'Contribution Margin per unit = Selling Price − Variable Cost per unit.',
      ],
      autoTags: [
        { label: 'Capital Budgeting', confidence: '98%', category: 'Finance' },
        { label: 'Break-Even Math', confidence: '96%', category: 'Economics' },
      ],
      flashcards: [
        {
          id: 'fc_biz_1',
          topic: 'Project Valuation',
          question: 'Why is NPV preferred over IRR when evaluating mutually exclusive capital projects?',
          answer:
            'NPV measures absolute wealth added in dollars and realistically assumes intermediate cash flows are reinvested at the cost of capital (WACC), whereas IRR assumes reinvestment at the internal rate itself.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_biz_1',
          question: 'A product sells for $50, has variable cost of $30 per unit, and fixed costs of $40,000. What is the break-even volume?',
          options: ['800 units', '1,333 units', '2,000 units', '4,000 units'],
          correctIndex: 2,
          explanation: 'Break-Even Units = 40,000 / (50 - 30) = 40,000 / 20 = 2,000 units.',
        },
      ],
      examPrepChecklist: [
        'Compute 5-year NPV and Payback Period for a machine replacement problem.',
        'Memorize Current, Quick, Debt-to-Equity, and DuPont ROE formulas.',
      ],
    },
  },
  {
    id: 'note_gen_11',
    title: 'Research Methodology & Technical Writing: IEEE Paper Structure, Citations & Statistical Hypothesis Testing',
    subject: 'Research Methodology & Ethics',
    categoryId: 'cat_gen',
    semester: 'Semester 7',
    unit: 'Unit 1 & 3 — Academic Writing & Inference',
    description:
      'Practical handbook for undergraduate capstone theses and research papers: IMRaD structure (Introduction, Methodology, Results, and Discussion), Type I vs Type II errors, p-values, t-tests vs ANOVA, plagiarism avoidance, and IEEE / APA citation standards.',
    fileType: 'MD',
    fileSize: '1.2 MB',
    pageCount: 2,
    uploadDate: '2026-10-05',
    uploaderId: 'usr_student_01',
    uploaderName: 'Aarav Mehta',
    uploaderRole: 'Class Representative',
    tags: ['IEEE Format', 'Hypothesis Testing', 'p-value', 'Research Ethics', 'IMRaD', 'Capstone Thesis'],
    rating: 4.8,
    ratingCount: 24,
    viewsCount: 620,
    downloadsCount: 230,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'gen_sec_1',
        title: '1. IMRaD Manuscript Architecture & Literature Synthesis',
        pageNumber: 1,
        summary: 'Writing structured abstracts, gap identification, and reproducible methodology sections.',
      },
      {
        id: 'gen_sec_2',
        title: '2. Null Hypothesis Testing, Type I/II Errors & p-Values',
        pageNumber: 2,
        summary: 'Significance level α, statistical power (1 - β), and confidence interval interpretation.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 1.2 — Structuring Technical Manuscripts',
        heading: 'The IMRaD Framework & Reproducible Experimental Design',
        paragraphs: [
          'Peer-reviewed engineering manuscripts follow the IMRaD structure: Introduction (what problem is solved and why existing work falls short), Methodology (how experiments were architected so peers can replicate them), Results (quantitative findings with error bars), and Discussion (interpretation, limitations, and future scope).',
        ],
        keyFormulaOrCode: `// IEEE Citation Style Format:
[1] J. Dean and S. Ghemawat, "MapReduce: Simplified data processing on large clusters,"
    Commun. ACM, vol. 51, no. 1, pp. 107–113, Jan. 2008.`,
        diagramCaption: 'Figure 1.1: Hourglass model of an academic paper (Broad Context → Specific Method → Broad Impact).',
        takeaways: [
          'An abstract must stand completely on its own: 1 sentence context, 1 sentence gap, 2 sentences methodology, 2 sentences quantitative results.',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 3.1 — Statistical Hypothesis Validation',
        heading: 'Type I (False Positive) vs Type II (False Negative) Errors',
        paragraphs: [
          'In hypothesis testing, the Null Hypothesis (H₀) posits zero effect or difference. A Type I error (rate α) occurs when we falsely reject a true H₀; a Type II error (rate β) occurs when we fail to reject a false H₀. Statistical power (1 - β) measures the probability of detecting a real effect when it exists.',
        ],
        keyFormulaOrCode: `Reject H_0 if: p-value < α (typically α = 0.05 or 0.01)
Statistical Power = 1 - β = P(Reject H_0 | H_1 is true)`,
        diagramCaption: 'Table 3.2: Confusion matrix of Null Hypothesis decision outcomes.',
        takeaways: [
          'A p-value < 0.05 demonstrates statistical significance, not necessarily large practical effect size (always report Cohen’s d or confidence intervals).',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Guides students through writing IEEE-formatted research papers and interpreting statistical hypothesis tests (α, β, p-values).',
      estimatedStudyMinutes: 15,
      examWeightageHint: 'Medium Weightage (~15% of End-Sem Paper)',
      keyPoints: [
        'Type I Error (α) = False Positive (rejecting a true null hypothesis).',
        'Type II Error (β) = False Negative (failing to reject a false null hypothesis).',
      ],
      autoTags: [
        { label: 'Academic Writing', confidence: '99%', category: 'General Studies' },
        { label: 'Statistics', confidence: '95%', category: 'Research Methods' },
      ],
      flashcards: [
        {
          id: 'fc_gen_1',
          topic: 'Hypothesis Testing',
          question: 'What is the difference between a Type I error and a Type II error?',
          answer:
            'A Type I error (α) is rejecting the null hypothesis H₀ when it is actually true (false positive). A Type II error (β) is failing to reject H₀ when the alternative H₁ is true (false negative).',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_gen_1',
          question: 'If a study sets α = 0.05 and obtains a p-value of 0.018, what is the statistical decision?',
          options: [
            'Reject the null hypothesis H₀',
            'Fail to reject the null hypothesis H₀',
            'Accept the null hypothesis as proven',
            'Increase α to 0.10',
          ],
          correctIndex: 0,
          explanation: 'Since p = 0.018 < α = 0.05, the observed result is statistically significant and we reject H₀.',
        },
      ],
      examPrepChecklist: [
        'Compare parametric (t-test, ANOVA) vs non-parametric (Mann-Whitney, Wilcoxon) tests.',
      ],
    },
  },
  {
    id: 'note_comp_12',
    title: 'Compiler Design: Lexical Analysis, LL(1) & LR(1) Parsing Tables & SSA Code Optimization',
    subject: 'Compiler Design',
    categoryId: 'cat_prog',
    semester: 'Semester 6',
    unit: 'Unit 2 & 3 — Syntax Analysis & IR',
    description:
      'Complete solved examples for FIRST and FOLLOW set computation, eliminating left recursion, LL(1) predictive parsing table construction, LR(0) / SLR(1) / LALR(1) / CLR(1) closure & goto automata, Three-Address Code (TAC), and peephole/loop optimizations.',
    fileType: 'PDF',
    fileSize: '4.0 MB',
    pageCount: 2,
    uploadDate: '2026-10-03',
    uploaderId: 'usr_student_03',
    uploaderName: 'Kabir Verma',
    uploaderRole: 'Student',
    tags: ['LL(1) & LR Parsing', 'FIRST and FOLLOW', 'Lexical Analysis', 'Three-Address Code', 'Compilers'],
    rating: 4.9,
    ratingCount: 37,
    viewsCount: 890,
    downloadsCount: 315,
    isSimulatedUpload: false,
    outline: [
      {
        id: 'cd_sec_1',
        title: '1. Left Recursion Elimination & FIRST/FOLLOW Sets',
        pageNumber: 1,
        summary: 'Top-down LL(1) grammar conditions and predictive parsing table cells.',
      },
      {
        id: 'cd_sec_2',
        title: '2. Bottom-Up LR Parsing Hierarchy (LR0 < SLR1 < LALR1 < CLR1)',
        pageNumber: 2,
        summary: 'Shift-Reduce vs Reduce-Reduce conflicts, handle pruning, and LALR state merging.',
      },
    ],
    pagesContent: [
      {
        pageNumber: 1,
        sectionTitle: 'Unit 2.1 — Top-Down Predictive Parsing',
        heading: 'Left Recursion Removal & LL(1) Conflict-Free Conditions',
        paragraphs: [
          'Top-down recursive descent parsers enter infinite loops on immediate or indirect left-recursive productions A → Aα | β. Every left-recursive rule is transformed into right recursion via a new non-terminal A’:',
        ],
        keyFormulaOrCode: `// Eliminating Immediate Left Recursion:
Original : A  -> A α | β
Rewritten: A  -> β A'
           A' -> α A' | ε

// LL(1) Disjointness Invariant for A -> α | β:
1. FIRST(α) ∩ FIRST(β) = ∅
2. If ε ∈ FIRST(α), then FIRST(β) ∩ FOLLOW(A) = ∅`,
        diagramCaption: 'Figure 2.2: Non-recursive predictive parser table lookup driven by stack and lookahead $.',
        takeaways: [
          'No ambiguous grammar or left-recursive grammar can ever be LL(1).',
        ],
      },
      {
        pageNumber: 2,
        sectionTitle: 'Unit 2.4 — Bottom-Up Shift-Reduce LR Parsers',
        heading: 'Comparing SLR(1), LALR(1), and Canonical LR(1) Power',
        paragraphs: [
          'Bottom-up LR parsers construct a rightmost derivation in reverse (left-to-right scan, rightmost derivation in reverse). While CLR(1) is the most powerful deterministic parser, it generates many states. LALR(1) merges CLR(1) states that share identical LR(0) cores, matching SLR(1)’s compact state count while retaining almost all of CLR(1)’s expressive power.',
        ],
        keyFormulaOrCode: `Expressive Power Hierarchy:
  LL(1)  ⊂  CLR(1)
  LR(0)  ⊂  SLR(1)  ⊂  LALR(1)  ⊂  CLR(1)

Number of States:
  |States(LR0)| = |States(SLR1)| = |States(LALR1)| < |States(CLR1)|`,
        diagramCaption: 'Figure 2.7: Merging LR(1) item sets with identical cores cannot introduce Shift-Reduce conflicts.',
        takeaways: [
          'Merging CLR(1) states into LALR(1) can NEVER introduce a new Shift-Reduce conflict, though in rare cases it can introduce a Reduce-Reduce conflict.',
        ],
      },
    ],
    aiPreview: {
      executiveSummary:
        'Essential compiler parsing guide covering FIRST/FOLLOW sets, LL(1) table generation, and the LR(0)/SLR(1)/LALR(1)/CLR(1) hierarchy.',
      estimatedStudyMinutes: 30,
      examWeightageHint: 'High Weightage (~25% of End-Sem Paper)',
      keyPoints: [
        'LR(0), SLR(1), and LALR(1) always have the exact same number of states in their DFA.',
        'LALR(1) state merging can only introduce Reduce-Reduce conflicts, never Shift-Reduce conflicts.',
      ],
      autoTags: [
        { label: 'Syntax Parsing', confidence: '99%', category: 'Compilers' },
        { label: 'Automata & Grammars', confidence: '96%', category: 'Theory' },
      ],
      flashcards: [
        {
          id: 'fc_cd_1',
          topic: 'LR Parsing',
          question: 'Can merging CLR(1) states with identical LR(0) cores into an LALR(1) parser ever cause a new Shift-Reduce conflict?',
          answer:
            'No. Shift actions depend only on the LR(0) core items, which are identical in the merged states. Only Reduce-Reduce conflicts can potentially arise.',
        },
      ],
      quizQuestions: [
        {
          id: 'qz_cd_1',
          question: 'Which of the following parsers always have the exact same number of DFA states for a given grammar?',
          options: ['SLR(1) and CLR(1)', 'LR(0), SLR(1), and LALR(1)', 'LL(1) and SLR(1)', 'LALR(1) and CLR(1)'],
          correctIndex: 1,
          explanation: 'LALR(1) merges CLR(1) states having identical LR(0) item cores, resulting in the exact same state count as LR(0) and SLR(1).',
        },
      ],
      examPrepChecklist: [
        'Compute FIRST and FOLLOW sets for the classic arithmetic expression grammar E -> E+T | T.',
        'Construct LR(0) canonical item sets and check if the grammar is SLR(1).',
      ],
    },
  },
];

export const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm_01',
    noteId: 'note_os_01',
    createdAt: '2026-10-29',
    collectionId: 'col_midterm',
    revisionStatus: 'reviewing',
    personalNote: 'Review Banker’s safe-sequence trace and Page 4 TLB Effective Access Time formula before Tuesday.',
    lastReviewedAt: '2 hours ago',
  },
  {
    id: 'bm_02',
    noteId: 'note_dbms_03',
    createdAt: '2026-10-27',
    collectionId: 'col_placements',
    revisionStatus: 'mastered',
    personalNote: 'Completed all BCNF lossless join tests and B+ Tree fanout numericals.',
    lastReviewedAt: 'Yesterday',
  },
  {
    id: 'bm_03',
    noteId: 'note_cn_02',
    createdAt: '2026-10-28',
    collectionId: 'col_midterm',
    revisionStatus: 'to_read',
    personalNote: 'Need to practice TCP Reno cwnd sawtooth graph problems.',
    lastReviewedAt: '3 days ago',
  },
  {
    id: 'bm_04',
    noteId: 'note_dsa_04',
    createdAt: '2026-10-24',
    collectionId: 'col_placements',
    revisionStatus: 'reviewing',
    personalNote: 'Revise 0/1 Knapsack vs Fractional Knapsack and AVL double rotations.',
    lastReviewedAt: '5 hours ago',
  },
];

export const INITIAL_RECENTLY_VIEWED: RecentlyViewedEntry[] = [
  {
    noteId: 'note_os_01',
    lastAccessedAt: '25 minutes ago',
    lastPageRead: 3,
    progressPercent: 75,
  },
  {
    noteId: 'note_dsa_04',
    lastAccessedAt: '3 hours ago',
    lastPageRead: 2,
    progressPercent: 66,
  },
  {
    noteId: 'note_dbms_03',
    lastAccessedAt: 'Yesterday at 9:15 PM',
    lastPageRead: 3,
    progressPercent: 100,
  },
  {
    noteId: 'note_cn_02',
    lastAccessedAt: '2 days ago',
    lastPageRead: 1,
    progressPercent: 33,
  },
  {
    noteId: 'note_math_05',
    lastAccessedAt: '4 days ago',
    lastPageRead: 2,
    progressPercent: 100,
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    noteId: 'note_os_01',
    userId: 'usr_peer_1',
    userName: 'Siddharth Rao',
    userRole: 'CSE Sem 5',
    rating: 5,
    comment: 'The Banker’s Algorithm trace and the TLB Effective Access Time breakdown saved me during the mid-sem quiz.',
    createdAt: '2026-10-29',
  },
  {
    id: 'rev_02',
    noteId: 'note_os_01',
    userId: 'usr_peer_2',
    userName: 'Neha Deshmukh',
    userRole: 'CSE Sem 5',
    rating: 5,
    comment: 'Super clean distinction between asymmetric Dining Philosophers and Priority Inheritance.',
    createdAt: '2026-10-30',
  },
  {
    id: 'rev_03',
    noteId: 'note_dbms_03',
    userId: 'usr_peer_3',
    userName: 'Rohan Joshi',
    userRole: 'IT Sem 5',
    rating: 5,
    comment: 'Best explanation of why 3NF is dependency-preserving while BCNF sometimes splits dependencies.',
    createdAt: '2026-10-27',
  },
  {
    id: 'rev_04',
    noteId: 'note_cn_02',
    userId: 'usr_peer_1',
    userName: 'Siddharth Rao',
    userRole: 'CSE Sem 5',
    rating: 5,
    comment: 'The Tahoe vs Reno cwnd rules on 3 Duplicate ACKs are crystal clear.',
    createdAt: '2026-10-28',
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    title: 'Midterm Revision Reminder',
    message: 'You have 2 notes in "Midterm Exam Sprint" marked as To Read / Reviewing.',
    timestamp: '15m ago',
    read: false,
    targetNoteId: 'note_os_01',
    type: 'revision',
  },
  {
    id: 'notif_02',
    title: 'TA Riya Sharma uploaded a resource',
    message: 'New verified notes added for Computer Networks: TCP Congestion Control & OSPF.',
    timestamp: '2h ago',
    read: false,
    targetNoteId: 'note_cn_02',
    type: 'upload',
  },
  {
    id: 'notif_03',
    title: 'Peer Review on your OS Notes',
    message: 'Neha Deshmukh rated your Operating Systems Unit 3 & 4 notes 5.0 stars.',
    timestamp: '1d ago',
    read: true,
    targetNoteId: 'note_os_01',
    type: 'review',
  },
];
