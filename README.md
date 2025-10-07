# Employee Reimbursement Portal

A modern web application for managing employee reimbursement processes with role-based access control, approval workflows, and comprehensive audit trails.

## Features

### 🔐 Authentication & Authorization
- **Role-based Access Control**: Three distinct user roles (Employee, Manager, Finance)
- **4 Demo Accounts per Role**:
  - **Employees**: emp001-emp004 (password: `password123`) - Juan Carlos, Maria Isabel, Miguel Antonio, Ana Sofia
  - **Managers**: mgr001-mgr004 (password: `manager123`) - Roberto Cruz, Elizabeth Flores, David Miguel, Carmen Rosa
  - **Finance**: fin001-fin004 (password: `finance123`) - Jose Emmanuel, Catherine Mae, Christian Paul, Patricia Anne

### 💼 Core Functionality

#### For Employees
- **Dashboard**: View personal claim statistics and status
- **New Claim Submission**: Comprehensive form with all required fields
- **Claim Tracking**: Real-time status updates through approval workflow

#### For Managers
- **Approval Dashboard**: View pending claims requiring approval
- **Quick Actions**: Approve/reject claims with comments
- **Team Overview**: Statistics of managed claims

#### For Finance Team
- **Finance Review**: Validate and process approved claims
- **Payment Processing**: Mark claims as paid after verification
- **Flag System**: Flag problematic claims for review

### 📋 Reimbursement Form Fields
- **Employee Details**: Name, ID, Department
- **Expense Information**:
  - Category (Travel, Meals, Office Supplies, etc.)
  - Date of expense
  - Amount in Philippine Peso (₱)
  - Payment method
  - Cost center
  - Project code (optional)
  - Purpose/justification
- **Supporting Documents**: File upload capability

### 🔄 Approval Workflow
1. **Submitted** → Employee submits claim
2. **Under Review** → Manager reviews claim
3. **Approved** → Manager approves, goes to Finance
4. **Finance Approved** → Finance validates and approves
5. **Paid** → Payment processed

### 📊 Audit Trail
- **Complete Logging**: Every action is logged with timestamp
- **User Tracking**: Track who performed each action
- **Filter Capabilities**: Filter by date range and action type
- **Compliance Ready**: Full transparency for auditing purposes

### 🎨 Modern Design
- **Azure Blue Theme**: Professional blue color palette
- **Glassmorphism UI**: Modern translucent design elements
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Elements**: Rounded buttons with hover effects

## Project Structure

```
PD Portal Sonnet 4 - Manual/
├── index.html          # Main application file
├── css/
│   └── styles.css      # Modern glassmorphism styling
├── js/
│   └── app.js          # Application logic and functionality
├── assets/             # Static assets (images, icons)
└── README.md           # Project documentation
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with glassmorphism effects
- **Icons**: Font Awesome 6.0
- **Storage**: Local browser storage (can be extended to backend)

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Login** using any of the demo accounts:

### Demo Accounts

| Role | Username | Password | Description |
|------|----------|----------|-------------|
| Employee | emp001-emp004 | password123 | Submit and track claims |
| Manager | mgr001-mgr004 | manager123 | Approve/reject team claims |
| Finance | fin001-fin004 | finance123 | Process payments |

## Features Walkthrough

### Employee Experience
1. **Login** as an employee (e.g., emp001/password123)
2. **View Dashboard** with personal claim statistics
3. **Submit New Claim** using the comprehensive form
4. **Track Status** through the approval workflow

### Manager Experience
1. **Login** as a manager (e.g., mgr001/manager123)
2. **Review Pending Claims** on the approval dashboard
3. **Approve/Reject Claims** with comments
4. **Monitor Team Statistics**

### Finance Experience
1. **Login** as finance user (e.g., fin001/finance123)
2. **Review Approved Claims** for payment processing
3. **Flag Suspicious Claims** for further review
4. **Process Payments** and mark claims as paid

### Audit Trail
- **Access from any role** to view complete system activity
- **Filter by date range** and action type
- **Export capabilities** for compliance reporting

## Key Benefits

✅ **Role-Based Security**: Each user sees only relevant features
✅ **Complete Audit Trail**: Full transparency and compliance
✅ **Modern UX**: Intuitive and visually appealing interface
✅ **Approval Workflow**: Structured multi-level approval process
✅ **Real-time Updates**: Status changes reflect immediately
✅ **Mobile Responsive**: Works on all device sizes
✅ **Professional Design**: Azure blue glassmorphism theme

## Sample Data

The application comes pre-loaded with sample claims to demonstrate the workflow:
- Claims in various stages (submitted, approved, paid)
- Historical audit trail entries
- Different expense categories and amounts

## Customization

The application can be easily customized:
- **Add new expense categories** in the dropdown
- **Modify approval workflow** stages
- **Adjust color scheme** in CSS variables
- **Add new user roles** with different permissions
- **Integrate with backend** systems for data persistence

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Future Enhancements

- Backend integration with database
- Email notifications for workflow steps
- Advanced reporting and analytics
- Integration with accounting systems
- Mobile app version
- Bulk operations for managers
- Advanced audit reporting

## License

This project is for demonstration purposes. Feel free to modify and adapt for your organization's needs.

---

**Contact**: For questions or support, please refer to the project documentation or create an issue in the repository.