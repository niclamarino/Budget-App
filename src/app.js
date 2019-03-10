class BudgetApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddExpense = this.handleAddExpense.bind(this)
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this)
    // this.handleEditExpenseModal = this.handleEditExpenseModal.bind(this)
    this.handleAddBudget = this.handleAddBudget.bind(this)
    this.handleAdjustBudget = this.handleAdjustBudget.bind(this)
    this.state = {
      totalExpenses : 0,
      expenseList : [],
      totalBudget : 0,
    };
  }
// lifecycle hooks ==========================================
  componentDidMount() {
    console.log('componentDidMount');
    try {
      const json = localStorage.getItem('expenseList');
      const expenseList = JSON.parse(json);
      if (expenseList) {
        this.setState(() => ({ expenseList }));
      }
    } catch (e) {
        // Do nothing
        console.log(e);
    }
  }
  componentDidUpdate(prevProps,prevState) {
    console.log('componentDidUpdate');
    if (prevState.expenseList.length !== this.state.expenseList.length) {
      const json = JSON.stringify(this.state.expenseList);
      localStorage.setItem('expenseList', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
// handleAddExpense ========================================
  handleAddExpense(expense) {
    console.log(expense)
    const filteredList = this.state.expenseList.filter((exp)=> expense.name === exp.name && expense.cost === exp.cost);

    if (!expense.name || !expense.cost) {
      return 'Expense name and cost needed.';
    } else if (filteredList.length > 0) {
      return 'This expense already exists.'
    }
    this.setState((prevState) => ({
      expenseList : prevState.expenseList.concat(expense),
      totalBudget : parseInt(this.state.totalBudget) - parseInt(expense.cost),
      totalExpenses : parseInt(this.state.totalExpenses) + parseInt(expense.cost)
    }));

  }
// handleEditExpenseModal =====================================
  // handleEditExpenseModal(expenseToEdit) {
  //   console.log(expenseToEdit);
  // }

// handleDeleteExpense =====================================
  handleDeleteExpense(expenseToRemove) {
    this.setState(prevState => ({
      expenseList : prevState.expenseList.filter(expense => {
        return expenseToRemove.name !== expense.name && expenseToRemove.cost !== expense.cost
      }),
      totalBudget : parseInt(prevState.totalBudget) + parseInt(expenseToRemove.cost),
      totalExpenses : parseInt(prevState.totalExpenses) - parseInt(expenseToRemove.cost)
    }));

  }

// handleAddBudget =========================================
  handleAddBudget(budget) {
    if (parseInt(budget) > 0) {
      this.setState(() => ({ totalBudget : budget }));
    }
    // todo -value error
  }

// handleAddBudget =========================================
  handleAdjustBudget(amount) {
    this.setState(() => {
      return {
        totalBudget : parseInt(this.state.totalBudget) + parseInt(amount)
      }
    });
  }

// render ==================================================
  render() {
    return (
      <div className="container-fluid">
        <Header
          totalBudget={this.state.totalBudget}
          totalExpenses={this.state.totalExpenses}
          handleAddBudget={this.handleAddBudget}
          handleAdjustBudget={this.handleAdjustBudget}
          handleAddExpense={this.handleAddExpense}
          // hasBudget={this.state.totalBudget>0}
        />
        <Expenses
          expenseList={this.state.expenseList}
          handleDeleteExpense={this.handleDeleteExpense}
          handleEditExpenseModal={this.handleEditExpenseModal}
        />
      </div>
    );
  }
}

// Header ==========================================
const Header = (props) => {
  const danger = props.totalBudget < 0 ? "danger" : ""
  return (
    <header>
      <div className="container">
        <div className="header-left">
          <EnterBudget
            handleAddBudget={props.handleAddBudget}
            // handleAdjustBudget={props.handleAdjustBudget}
            totalBudget={props.totalBudget}
          />
          <AddExpense
            handleAddExpense={props.handleAddExpense}
            // hasBudget={props.hasBudget}
          />
        </div>
        <div className="header-right">
          <h1>Budget: $<span className={danger}>{props.totalBudget}</span></h1>
          <h2>Total Expenses: ${props.totalExpenses}</h2>
        </div>
      </div>
    </header>
  );
};

// EnterBudget =====================================
// class EnterBudget extends React.Component {
//   constructor(props) {
//     super(props)
//     this.handleAddBudget = this.handleAddBudget.bind(this);
//     this.handleAdjustBudget=this.handleAdjustBudget.bind(this);
//     //todo error state
//   }
//   handleAddBudget(e) {
//     e.preventDefault();
//     const budget = e.target.elements.budget.value
//     //todo error handling
//     this.props.handleAddBudget(budget);
//     e.target.elements.budget.value='';
//     this.setState(() => ({ hasBudget: true }));
//   }
//   handleAdjustBudget(e) {
//     e.preventDefault();
//     const amount = e.target.elements.adjustment.value;
//     this.props.handleAdjustBudget(amount);
//     e.target.elements.adjustment.value='';
//   }
//   render() {
//     return (
//       <div> { /*todo*/}
//         <form>
//           <label>Add to or Subtract from Budget</label>
//           <input className="cost-input" type="number" name="adjustment" placeholder="+/-" />
//           <button className="btn btn-dark">Submit</button>
//           {/* <button className="btn btn-danger">Reset</button> */}
//         </form>
//         <form onSubmit={this.handleAddBudget}>
//           <label>Enter Budget</label>
//           <input  className="cost-input" type="number" name="budget" min="1" placeholder="$" />
//           <button className="btn btn-dark">Submit</button>
//         </form>
//     </div>
//     );
//   }
// }


// EnterBudget =====================================
class EnterBudget extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddBudget = this.handleAddBudget.bind(this)
    //todo error state
  }
  handleAddBudget(e) {
    e.preventDefault();
    const budget = e.target.elements.budget.value
    //todo error handling
    this.props.handleAddBudget(budget);
    e.target.elements.budget.value=''
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddBudget}>
          <label>Enter Budget</label>
          <input className="cost-input" type="number" name="budget" min="1" placeholder="$" />
          <button className="btn btn-dark">Submit</button>
        </form>
      </div>
    );
  }
}

// AdjustBudget =====================================
class AdjustBudget extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdjustBudget = this.handleAdjustBudget.bind(this)
  }
  handleAdjustBudget(e) {
    e.preventDefault();
    const amount = e.target.elements.adjustment.value;
    this.props.handleAdjustBudget(amount);
    e.target.elements.adjustment.value=''
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAdjustBudget}>
          <label>Add to or Subtract from Budget</label>
          <input type="number" name="adjustment" placeholder="+/-" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}




// AddExpense ======================================
class AddExpense extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddExpense = this.handleAddExpense.bind(this)
    this.state = {
      error : undefined
    };
  }
  handleAddExpense(e) {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const cost = e.target.elements.cost.value;
    const error = this.props.handleAddExpense({ name , cost });
    this.setState(()=>({error}));

    if (!error) {
      e.target.elements.name.value=''
      e.target.elements.cost.value=''
    }
  }
  render() {
    return (
      <div className="add-expense">
        <form onSubmit={this.handleAddExpense}>
          <label>Add an Expense</label>
          <input type="text" name="name" placeholder="Expense Name"/>
          <input  className="cost-input" type="number" name="cost" min="1" placeholder="$"/>
          <button className="btn btn-dark">Submit</button>
        </form>
         {this.state.error && <p class="error-msg text-center">{this.state.error}</p>}
      </div>
    );
  }
}

// Expenses ========================================
const Expenses = (props) => {
  return (
    <section id="expenses" className="container">
      <h2 className="text-center text-muted">Expenses</h2>
      {
        props.expenseList.length>0 ? <table className="expense table table-striped table-bordered table-hover">
          <tbody>
            {
              props.expenseList.map((expense) => (
                <Expense
                  key= {expense.name}
                  expenseName = {expense.name}
                  expenseCost = {expense.cost}
                  handleDeleteExpense={props.handleDeleteExpense}
                />
              ))
            }
          </tbody>
        </table>
        : <p id="empty-expense-list-msg" className="text-center">No expenses to show.</p>
      }
    </section>
  );
};

// Expense ==========================================
const Expense = (props) => {
  return (
    <tr>
      {/* <td className="expense-edit-btn">
        <button className="btn btn-secondary" onClick={(e) => {
          props.handleEditExpenseModal({name : props.expenseName, cost : props.expenseCost})}}>Edit</button>
      </td> */}
      <td className="expense-name">{props.expenseName}</td>
      <td className="expense-cost">${props.expenseCost}</td>
      <td className="expense-remove-btn">
        <button className="btn btn-danger" onClick={(e) => {
          props.handleDeleteExpense({name : props.expenseName, cost : props.expenseCost})
        }}>Remove</button>

      </td>
    </tr>
  );
};

// EditExpense ========================================
const EditExpense = (props) => {
  return (
    <div className="edit-expense-modal container">
      <form>
        <label>Edit Expense</label>
        <input type="text" name="name" placeholder="Expense Name"/>
        <input  className="cost-input" type="number" name="cost" min="1" placeholder="$"/>
        <button className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}

ReactDOM.render(<BudgetApp />, document.getElementById('app'));
