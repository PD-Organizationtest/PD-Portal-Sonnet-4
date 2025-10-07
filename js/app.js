// Employee Reimbursement Portal Application
class ReimbursementPortal {
    constructor() {
        this.currentUser = null;
        this.claims = [];
        this.auditLog = [];
        this.users = this.initializeUsers();
        this.initializeApp();
        this.loadSampleData();
    }

    // Initialize users with different roles
    initializeUsers() {
        return {
            // Employees
            emp001: { id: 'emp001', name: 'Juan Carlos Dela Cruz', role: 'employee', department: 'IT', manager: 'mgr001' },
            emp002: { id: 'emp002', name: 'Maria Isabel Santos', role: 'employee', department: 'HR', manager: 'mgr002' },
            emp003: { id: 'emp003', name: 'Miguel Antonio Reyes', role: 'employee', department: 'Finance', manager: 'mgr003' },
            emp004: { id: 'emp004', name: 'Ana Sofia Garcia', role: 'employee', department: 'Operations', manager: 'mgr004' },
            
            // Managers
            mgr001: { id: 'mgr001', name: 'Roberto Cruz Mendoza', role: 'manager', department: 'IT' },
            mgr002: { id: 'mgr002', name: 'Elizabeth Flores Castro', role: 'manager', department: 'HR' },
            mgr003: { id: 'mgr003', name: 'David Miguel Torres', role: 'manager', department: 'Finance' },
            mgr004: { id: 'mgr004', name: 'Carmen Rosa Villanueva', role: 'manager', department: 'Operations' },
            
            // Finance Team
            fin001: { id: 'fin001', name: 'Jose Emmanuel Rodriguez', role: 'finance', department: 'Finance' },
            fin002: { id: 'fin002', name: 'Catherine Mae Gonzales', role: 'finance', department: 'Finance' },
            fin003: { id: 'fin003', name: 'Christian Paul Hernandez', role: 'finance', department: 'Finance' },
            fin004: { id: 'fin004', name: 'Patricia Anne Ramos', role: 'finance', department: 'Finance' }
        };
    }

    // Initialize the application
    initializeApp() {
        this.bindEvents();
        this.showLoginPage();
    }

    // Bind event listeners
    bindEvents() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // New claim form
        document.getElementById('newClaimForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewClaim();
        });

        // Set max date for expense date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('expenseDate').max = today;

        // Set default audit filter dates
        document.getElementById('auditDateFrom').value = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        document.getElementById('auditDateTo').value = today;
    }

    // Handle login
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication check
        const validCredentials = this.validateCredentials(username, password);
        
        if (validCredentials && this.users[username]) {
            this.currentUser = this.users[username];
            this.showToast('Login successful!', 'success');
            this.showMainApp();
            this.logAction('login', null, 'User logged in');
        } else {
            this.showToast('Invalid credentials. Please try again.', 'error');
        }
    }

    // Validate credentials
    validateCredentials(username, password) {
        const validPasswords = {
            emp001: 'password123', emp002: 'password123', emp003: 'password123', emp004: 'password123',
            mgr001: 'manager123', mgr002: 'manager123', mgr003: 'manager123', mgr004: 'manager123',
            fin001: 'finance123', fin002: 'finance123', fin003: 'finance123', fin004: 'finance123'
        };
        return validPasswords[username] === password;
    }

    // Fill login form (for demo purposes)
    fillLogin(username, password) {
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
    }

    // Show main application
    showMainApp() {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('appContainer').style.display = 'grid';
        
        // Update user info
        document.getElementById('userInfo').textContent = `${this.currentUser.name} (${this.currentUser.role.toUpperCase()})`;
        
        // Setup navigation based on role
        this.setupNavigation();
        
        // Show appropriate dashboard
        this.showDashboard();
        
        // Update employee form if employee
        if (this.currentUser.role === 'employee') {
            this.updateEmployeeForm();
        }
    }

    // Setup navigation based on user role
    setupNavigation() {
        const navMenu = document.getElementById('navMenu');
        navMenu.innerHTML = '';

        const navItems = this.getNavigationItems();
        
        navItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="app.showPage('${item.page}')" ${item.page === this.getDefaultPage() ? 'class="active"' : ''}>
                <i class="${item.icon}"></i> ${item.label}
            </a>`;
            navMenu.appendChild(li);
        });
    }

    // Get navigation items based on role
    getNavigationItems() {
        const commonItems = [
            { label: 'Audit Trail', icon: 'fas fa-history', page: 'auditTrail' }
        ];

        switch (this.currentUser.role) {
            case 'employee':
                return [
                    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', page: 'employeeDashboard' },
                    { label: 'New Claim', icon: 'fas fa-plus-circle', page: 'newClaimPage' },
                    ...commonItems
                ];
            case 'manager':
                return [
                    { label: 'Approval Dashboard', icon: 'fas fa-tasks', page: 'managerDashboard' },
                    ...commonItems
                ];
            case 'finance':
                return [
                    { label: 'Finance Dashboard', icon: 'fas fa-calculator', page: 'financeDashboard' },
                    ...commonItems
                ];
            default:
                return commonItems;
        }
    }

    // Get default page based on role
    getDefaultPage() {
        switch (this.currentUser.role) {
            case 'employee': return 'employeeDashboard';
            case 'manager': return 'managerDashboard';
            case 'finance': return 'financeDashboard';
            default: return 'auditTrail';
        }
    }

    // Show appropriate dashboard
    showDashboard() {
        this.showPage(this.getDefaultPage());
    }

    // Show specific page
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        document.getElementById(pageId).classList.add('active');

        // Update navigation active state
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[onclick="app.showPage('${pageId}')"]`).classList.add('active');

        // Load page-specific data
        this.loadPageData(pageId);
    }

    // Load page-specific data
    loadPageData(pageId) {
        switch (pageId) {
            case 'employeeDashboard':
                this.loadEmployeeDashboard();
                break;
            case 'managerDashboard':
                this.loadManagerDashboard();
                break;
            case 'financeDashboard':
                this.loadFinanceDashboard();
                break;
            case 'auditTrail':
                this.loadAuditTrail();
                break;
        }
    }

    // Update employee form with current user data
    updateEmployeeForm() {
        document.getElementById('employeeName').value = this.currentUser.name;
        document.getElementById('employeeId').value = this.currentUser.id;
        document.getElementById('department').value = this.currentUser.department;
    }

    // Handle new claim submission
    handleNewClaim() {
        const formData = new FormData(document.getElementById('newClaimForm'));
        const claimData = {
            id: this.generateClaimId(),
            employeeId: this.currentUser.id,
            employeeName: this.currentUser.name,
            department: this.currentUser.department,
            managerId: this.currentUser.manager,
            expenseCategory: formData.get('expenseCategory'),
            expenseDate: formData.get('expenseDate'),
            amount: parseFloat(formData.get('amount')),
            paymentMethod: formData.get('paymentMethod'),
            costCenter: formData.get('costCenter'),
            projectCode: formData.get('projectCode') || null,
            purpose: formData.get('purpose'),
            status: 'submitted',
            submittedDate: new Date().toISOString(),
            approvalHistory: []
        };

        this.claims.push(claimData);
        this.logAction('submitted', claimData.id, `Claim submitted for ${this.formatCurrency(claimData.amount)}`);
        
        this.showToast('Claim submitted successfully!', 'success');
        document.getElementById('newClaimForm').reset();
        this.updateEmployeeForm();
        this.showPage('employeeDashboard');
    }

    // Generate unique claim ID
    generateClaimId() {
        const timestamp = Date.now().toString().slice(-6);
        return `CLM-${timestamp}`;
    }

    // Load employee dashboard
    loadEmployeeDashboard() {
        const userClaims = this.claims.filter(claim => claim.employeeId === this.currentUser.id);
        
        // Update statistics
        document.getElementById('totalClaims').textContent = userClaims.length;
        document.getElementById('pendingClaims').textContent = userClaims.filter(c => c.status === 'submitted' || c.status === 'pending').length;
        document.getElementById('approvedClaims').textContent = userClaims.filter(c => c.status === 'approved' || c.status === 'paid').length;
        document.getElementById('totalAmount').textContent = this.formatCurrency(userClaims.reduce((sum, c) => sum + c.amount, 0));

        // Load claims table
        this.loadClaimsTable('employeeClaimsBody', userClaims, 'employee');
    }

    // Load manager dashboard
    loadManagerDashboard() {
        const pendingClaims = this.claims.filter(claim => 
            claim.managerId === this.currentUser.id && claim.status === 'submitted'
        );
        
        const todayApproved = this.claims.filter(claim => 
            claim.managerId === this.currentUser.id && 
            claim.status === 'approved' && 
            this.isToday(new Date(claim.approvalHistory[0]?.date))
        );

        const todayRejected = this.claims.filter(claim => 
            claim.managerId === this.currentUser.id && 
            claim.status === 'rejected' && 
            this.isToday(new Date(claim.approvalHistory[0]?.date))
        );

        // Update statistics
        document.getElementById('pendingApprovals').textContent = pendingClaims.length;
        document.getElementById('approvedToday').textContent = todayApproved.length;
        document.getElementById('rejectedToday').textContent = todayRejected.length;
        document.getElementById('totalPendingAmount').textContent = this.formatCurrency(pendingClaims.reduce((sum, c) => sum + c.amount, 0));

        // Load claims table
        this.loadClaimsTable('managerClaimsBody', pendingClaims, 'manager');
    }

    // Load finance dashboard
    loadFinanceDashboard() {
        const financeReviewClaims = this.claims.filter(claim => claim.status === 'approved');
        const readyForPayment = this.claims.filter(claim => claim.status === 'finance_approved');
        const processedToday = this.claims.filter(claim => 
            claim.status === 'paid' && this.isToday(new Date(claim.paidDate))
        );

        // Update statistics
        document.getElementById('financeReviewPending').textContent = financeReviewClaims.length;
        document.getElementById('readyForPayment').textContent = readyForPayment.length;
        document.getElementById('processedToday').textContent = processedToday.length;
        document.getElementById('totalPaymentAmount').textContent = this.formatCurrency(
            [...financeReviewClaims, ...readyForPayment].reduce((sum, c) => sum + c.amount, 0)
        );

        // Load claims table
        this.loadClaimsTable('financeClaimsBody', [...financeReviewClaims, ...readyForPayment], 'finance');
    }

    // Load claims table
    loadClaimsTable(tableBodyId, claims, userRole) {
        const tbody = document.getElementById(tableBodyId);
        tbody.innerHTML = '';

        claims.forEach(claim => {
            const row = document.createElement('tr');
            row.innerHTML = this.generateTableRow(claim, userRole);
            tbody.appendChild(row);
        });
    }

    // Generate table row HTML
    generateTableRow(claim, userRole) {
        const statusBadge = `<span class="status-badge status-${claim.status}">${claim.status.replace('_', ' ').toUpperCase()}</span>`;
        const actionButtons = this.generateActionButtons(claim, userRole);

        switch (userRole) {
            case 'employee':
                return `
                    <td>${claim.id}</td>
                    <td>${this.formatDate(claim.expenseDate)}</td>
                    <td>${claim.expenseCategory}</td>
                    <td>${this.formatCurrency(claim.amount)}</td>
                    <td>${statusBadge}</td>
                    <td>${actionButtons}</td>
                `;
            case 'manager':
                return `
                    <td>${claim.id}</td>
                    <td>${claim.employeeName}</td>
                    <td>${this.formatDate(claim.expenseDate)}</td>
                    <td>${claim.expenseCategory}</td>
                    <td>${this.formatCurrency(claim.amount)}</td>
                    <td>${statusBadge}</td>
                    <td>${actionButtons}</td>
                `;
            case 'finance':
                return `
                    <td>${claim.id}</td>
                    <td>${claim.employeeName}</td>
                    <td>${this.users[claim.managerId]?.name || 'N/A'}</td>
                    <td>${claim.expenseCategory}</td>
                    <td>${this.formatCurrency(claim.amount)}</td>
                    <td>${statusBadge}</td>
                    <td>${actionButtons}</td>
                `;
            default:
                return '';
        }
    }

    // Generate action buttons based on user role and claim status
    generateActionButtons(claim, userRole) {
        const buttons = [];

        // View button for all users
        buttons.push(`<button class="btn btn-sm btn-secondary" onclick="app.viewClaim('${claim.id}')">
            <i class="fas fa-eye"></i> View
        </button>`);

        // Role-specific action buttons
        if (userRole === 'manager' && claim.status === 'submitted') {
            buttons.push(`<button class="btn btn-sm btn-success" onclick="app.approveClaim('${claim.id}')">
                <i class="fas fa-check"></i> Approve
            </button>`);
            buttons.push(`<button class="btn btn-sm btn-danger" onclick="app.rejectClaim('${claim.id}')">
                <i class="fas fa-times"></i> Reject
            </button>`);
        }

        if (userRole === 'finance' && (claim.status === 'approved' || claim.status === 'finance_approved')) {
            if (claim.status === 'approved') {
                buttons.push(`<button class="btn btn-sm btn-success" onclick="app.financeApprove('${claim.id}')">
                    <i class="fas fa-check-double"></i> Approve
                </button>`);
                buttons.push(`<button class="btn btn-sm btn-warning" onclick="app.financeFlag('${claim.id}')">
                    <i class="fas fa-flag"></i> Flag
                </button>`);
            } else {
                buttons.push(`<button class="btn btn-sm btn-primary" onclick="app.processPayout('${claim.id}')">
                    <i class="fas fa-money-bill-wave"></i> Pay
                </button>`);
            }
        }

        return `<div class="action-buttons">${buttons.join('')}</div>`;
    }

    // View claim details
    viewClaim(claimId) {
        const claim = this.claims.find(c => c.id === claimId);
        if (!claim) return;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="claim-details">
                <div class="detail-section">
                    <h4>Employee Information</h4>
                    <p><strong>Name:</strong> ${claim.employeeName}</p>
                    <p><strong>Employee ID:</strong> ${claim.employeeId}</p>
                    <p><strong>Department:</strong> ${claim.department}</p>
                    <p><strong>Cost Center:</strong> ${claim.costCenter}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Expense Details</h4>
                    <p><strong>Category:</strong> ${claim.expenseCategory}</p>
                    <p><strong>Date:</strong> ${this.formatDate(claim.expenseDate)}</p>
                    <p><strong>Amount:</strong> ${this.formatCurrency(claim.amount)}</p>
                    <p><strong>Payment Method:</strong> ${claim.paymentMethod}</p>
                    ${claim.projectCode ? `<p><strong>Project Code:</strong> ${claim.projectCode}</p>` : ''}
                    <p><strong>Purpose:</strong> ${claim.purpose}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Status</h4>
                    <p><strong>Current Status:</strong> <span class="status-badge status-${claim.status}">${claim.status.replace('_', ' ').toUpperCase()}</span></p>
                    <p><strong>Submitted:</strong> ${this.formatDateTime(claim.submittedDate)}</p>
                </div>
                
                ${claim.approvalHistory.length > 0 ? `
                <div class="detail-section">
                    <h4>Approval History</h4>
                    ${claim.approvalHistory.map(approval => `
                        <div class="approval-entry">
                            <p><strong>${approval.action}:</strong> ${approval.approver} on ${this.formatDateTime(approval.date)}</p>
                            ${approval.comments ? `<p><em>"${approval.comments}"</em></p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;

        document.getElementById('modalTitle').textContent = `Claim Details - ${claimId}`;
        document.getElementById('modalFooter').innerHTML = '<button class="btn btn-secondary" onclick="app.closeModal()">Close</button>';
        
        this.openModal();
    }

    // Approve claim (Manager)
    approveClaim(claimId) {
        const comments = prompt('Enter approval comments (optional):');
        
        const claim = this.claims.find(c => c.id === claimId);
        if (claim) {
            claim.status = 'approved';
            claim.approvalHistory.push({
                action: 'Approved by Manager',
                approver: this.currentUser.name,
                date: new Date().toISOString(),
                comments: comments || ''
            });

            this.logAction('approved', claimId, `Claim approved by manager: ${this.currentUser.name}`);
            this.showToast('Claim approved successfully!', 'success');
            this.loadPageData('managerDashboard');
        }
    }

    // Reject claim (Manager)
    rejectClaim(claimId) {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        const claim = this.claims.find(c => c.id === claimId);
        if (claim) {
            claim.status = 'rejected';
            claim.approvalHistory.push({
                action: 'Rejected by Manager',
                approver: this.currentUser.name,
                date: new Date().toISOString(),
                comments: reason
            });

            this.logAction('rejected', claimId, `Claim rejected by manager: ${this.currentUser.name}. Reason: ${reason}`);
            this.showToast('Claim rejected.', 'warning');
            this.loadPageData('managerDashboard');
        }
    }

    // Finance approval
    financeApprove(claimId) {
        const claim = this.claims.find(c => c.id === claimId);
        if (claim) {
            claim.status = 'finance_approved';
            claim.approvalHistory.push({
                action: 'Approved by Finance',
                approver: this.currentUser.name,
                date: new Date().toISOString(),
                comments: 'Finance verification completed'
            });

            this.logAction('finance_approved', claimId, `Claim approved by finance: ${this.currentUser.name}`);
            this.showToast('Claim approved for payment!', 'success');
            this.loadPageData('financeDashboard');
        }
    }

    // Finance flag
    financeFlag(claimId) {
        const reason = prompt('Enter flag reason:');
        if (!reason) return;

        const claim = this.claims.find(c => c.id === claimId);
        if (claim) {
            claim.status = 'flagged';
            claim.approvalHistory.push({
                action: 'Flagged by Finance',
                approver: this.currentUser.name,
                date: new Date().toISOString(),
                comments: reason
            });

            this.logAction('flagged', claimId, `Claim flagged by finance: ${this.currentUser.name}. Reason: ${reason}`);
            this.showToast('Claim flagged for review.', 'warning');
            this.loadPageData('financeDashboard');
        }
    }

    // Process payout
    processPayout(claimId) {
        const claim = this.claims.find(c => c.id === claimId);
        if (claim) {
            claim.status = 'paid';
            claim.paidDate = new Date().toISOString();
            claim.approvalHistory.push({
                action: 'Payment Processed',
                approver: this.currentUser.name,
                date: new Date().toISOString(),
                comments: 'Payment processed successfully'
            });

            this.logAction('paid', claimId, `Payment processed by: ${this.currentUser.name}`);
            this.showToast('Payment processed successfully!', 'success');
            this.loadPageData('financeDashboard');
        }
    }

    // Load audit trail
    loadAuditTrail() {
        const auditBody = document.getElementById('auditTableBody');
        auditBody.innerHTML = '';

        // Sort audit log by date (newest first)
        const sortedLog = [...this.auditLog].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        sortedLog.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatDateTime(entry.timestamp)}</td>
                <td>${entry.claimId || 'N/A'}</td>
                <td>${entry.userId}</td>
                <td><span class="status-badge status-${entry.action}">${entry.action.toUpperCase()}</span></td>
                <td>${entry.details}</td>
                <td>${entry.ipAddress || '127.0.0.1'}</td>
            `;
            auditBody.appendChild(row);
        });
    }

    // Filter audit trail
    filterAuditTrail() {
        const dateFrom = document.getElementById('auditDateFrom').value;
        const dateTo = document.getElementById('auditDateTo').value;
        const action = document.getElementById('auditAction').value;

        let filteredLog = [...this.auditLog];

        if (dateFrom) {
            filteredLog = filteredLog.filter(entry => new Date(entry.timestamp) >= new Date(dateFrom));
        }

        if (dateTo) {
            filteredLog = filteredLog.filter(entry => new Date(entry.timestamp) <= new Date(dateTo + 'T23:59:59'));
        }

        if (action) {
            filteredLog = filteredLog.filter(entry => entry.action === action);
        }

        // Sort by date (newest first)
        filteredLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const auditBody = document.getElementById('auditTableBody');
        auditBody.innerHTML = '';

        filteredLog.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatDateTime(entry.timestamp)}</td>
                <td>${entry.claimId || 'N/A'}</td>
                <td>${entry.userId}</td>
                <td><span class="status-badge status-${entry.action}">${entry.action.toUpperCase()}</span></td>
                <td>${entry.details}</td>
                <td>${entry.ipAddress || '127.0.0.1'}</td>
            `;
            auditBody.appendChild(row);
        });
    }

    // Log action to audit trail
    logAction(action, claimId, details) {
        this.auditLog.push({
            timestamp: new Date().toISOString(),
            userId: this.currentUser?.id || 'system',
            userName: this.currentUser?.name || 'System',
            action: action,
            claimId: claimId,
            details: details,
            ipAddress: '127.0.0.1' // Simulated IP address
        });
    }

    // Load sample data
    loadSampleData() {
        // Create some sample claims for demonstration
        const sampleClaims = [
            {
                id: 'CLM-001001',
                employeeId: 'emp001',
                employeeName: 'Juan Carlos Dela Cruz',
                department: 'IT',
                managerId: 'mgr001',
                expenseCategory: 'travel',
                expenseDate: '2024-01-15',
                amount: 2500.00,
                paymentMethod: 'bank_transfer',
                costCenter: 'CC001',
                projectCode: 'PRJ001',
                purpose: 'Client meeting in Manila for project requirements gathering',
                status: 'approved',
                submittedDate: '2024-01-16T09:00:00Z',
                approvalHistory: [
                    {
                        action: 'Approved by Manager',
                        approver: 'Roberto Cruz Mendoza',
                        date: '2024-01-16T14:30:00Z',
                        comments: 'Approved - business justified'
                    }
                ]
            },
            {
                id: 'CLM-001002',
                employeeId: 'emp002',
                employeeName: 'Maria Isabel Santos',
                department: 'HR',
                managerId: 'mgr002',
                expenseCategory: 'training',
                expenseDate: '2024-01-20',
                amount: 5000.00,
                paymentMethod: 'credit_card',
                costCenter: 'CC002',
                projectCode: null,
                purpose: 'HR certification course - Professional Development',
                status: 'submitted',
                submittedDate: '2024-01-21T10:15:00Z',
                approvalHistory: []
            },
            {
                id: 'CLM-001003',
                employeeId: 'emp003',
                employeeName: 'Miguel Antonio Reyes',
                department: 'Finance',
                managerId: 'mgr003',
                expenseCategory: 'office',
                expenseDate: '2024-01-18',
                amount: 1200.00,
                paymentMethod: 'bank_transfer',
                costCenter: 'CC003',
                projectCode: null,
                purpose: 'Office supplies for quarterly reporting',
                status: 'finance_approved',
                submittedDate: '2024-01-19T08:30:00Z',
                approvalHistory: [
                    {
                        action: 'Approved by Manager',
                        approver: 'David Miguel Torres',
                        date: '2024-01-19T13:45:00Z',
                        comments: 'Approved'
                    },
                    {
                        action: 'Approved by Finance',
                        approver: 'Jose Emmanuel Rodriguez',
                        date: '2024-01-20T09:15:00Z',
                        comments: 'Finance verification completed'
                    }
                ]
            }
        ];

        this.claims = sampleClaims;

        // Create sample audit log entries
        this.auditLog = [
            {
                timestamp: '2024-01-16T09:00:00Z',
                userId: 'emp001',
                userName: 'Juan Carlos Dela Cruz',
                action: 'submitted',
                claimId: 'CLM-001001',
                details: 'Claim submitted for ₱2,500.00',
                ipAddress: '192.168.1.100'
            },
            {
                timestamp: '2024-01-16T14:30:00Z',
                userId: 'mgr001',
                userName: 'Roberto Cruz Mendoza',
                action: 'approved',
                claimId: 'CLM-001001',
                details: 'Claim approved by manager: Robert Brown',
                ipAddress: '192.168.1.101'
            },
            {
                timestamp: '2024-01-21T10:15:00Z',
                userId: 'emp002',
                userName: 'Maria Isabel Santos',
                action: 'submitted',
                claimId: 'CLM-001002',
                details: 'Claim submitted for ₱5,000.00',
                ipAddress: '192.168.1.102'
            }
        ];
    }

    // Utility functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-PH');
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString('en-PH');
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // Modal functions
    openModal() {
        document.getElementById('claimModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('claimModal').classList.remove('active');
    }

    // Toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    getToastIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    // Show login page
    showLoginPage() {
        document.getElementById('loginContainer').style.display = 'flex';
        document.getElementById('appContainer').style.display = 'none';
    }

    // Logout function
    logout() {
        this.logAction('logout', null, 'User logged out');
        this.currentUser = null;
        this.showLoginPage();
        document.getElementById('loginForm').reset();
        this.showToast('Logged out successfully', 'info');
    }
}

// Global functions for HTML onclick events
window.fillLogin = function(username, password) {
    app.fillLogin(username, password);
};

window.logout = function() {
    app.logout();
};

window.showPage = function(pageId) {
    app.showPage(pageId);
};

window.closeModal = function() {
    app.closeModal();
};

window.filterAuditTrail = function() {
    app.filterAuditTrail();
};

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new ReimbursementPortal();
});

// Make app globally available for debugging
window.app = app;