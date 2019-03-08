class BudgetApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddExpense = this.handleAddExpense.bind(this)
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this)
    this.handleAddBudget = this.handleAddBudget.bind(this)
    this.handleAdjustBudget = this.handleAdjustBudget.bind(this)
    this.subtractExpenseFromBudget = this.subtractExpenseFromBudget.bind(this)
    this.state = {
      totalExpenses : 0,
      expenseList : [
        {name : "Adopt a puppy",cost : 500},
        {name : "Dog Food",cost : 50},
        {name : "Dog Leash",cost : 20},
        {name : "Dog Bowls",cost : 15}
      ],
      totalBudget : 0
    };
  }
// lifecycle hooks ==========================================
  componentDidMount() {
    //todo
    console.log('componentDidMount');
  }
  componentDidUpdate(prevProps,prevState) {
    //todo
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
// handleAddExpense ========================================
  handleAddExpense(expense) {
    this.setState((prevState) => ({
      expenseList : prevState.expenseList.concat(expense),
      totalBudget : parseInt(this.state.totalBudget) - parseInt(expense.cost)
    }));

  }
// handleDeleteExpense =====================================
  handleDeleteExpense(expenseToRemove) {
    this.setState(prevState => ({
      expenseList : prevState.expenseList.filter(expense => {
        return expenseToRemove.name !== expense.name && expenseToRemove.cost !== expense.cost
      }),
      totalBudget : parseInt(prevState.totalBudget) + parseInt(expenseToRemove.cost)
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

// subtractExpenseFromBudget ===============================
  subtractExpenseFromBudget(costToSubtract) {
    //todo
  }

// render ==================================================
  render() {
    return (
      <div className="container-fluid">
        <Header
          totalBudget={this.state.totalBudget}    totalExpenses={this.state.totalExpenses}
        />
        {
          this.state.totalBudget === 0 ? <EnterBudget handleAddBudget={this.handleAddBudget}/> : <AdjustBudget handleAdjustBudget={this.handleAdjustBudget}/>
        }
        <AddExpense
           handleAddExpense={this.handleAddExpense}
        />
        <Expenses
          expenseList={this.state.expenseList}
          handleDeleteExpense={this.handleDeleteExpense}
        />
      </div>
    );
  }
}

// Header ==========================================
const Header = (props) => {
  return (
    <header>
      <h1>Budget: ${props.totalBudget}</h1>
      <h2>Total Expenses: ${props.totalExpenses}</h2>
    </header>
  );
};

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
      <section class="enter-budget">
        <form onSubmit={this.handleAddBudget}>
          <label>Enter Budget</label>
          <input type="number" name="budget" min="1" placeholder="$" />
          <button>Submit</button>
        </form>
      </section>
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
      <section class="enter-budget">
        <form onSubmit={this.handleAdjustBudget}>
          <label>Add to or Subtract from Budget</label>
          <input type="number" name="adjustment" placeholder="+/-" />
          <button>Submit</button>
        </form>
      </section>
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
    const name = e.target.elements.name.value.trim()
    const cost = e.target.elements.cost.value
    this.props.handleAddExpense({ name , cost });
    e.target.elements.name.value=''
    e.target.elements.cost.value=''
  }
  render() {
    return (
      <section className="add-expense">
        <h3>Add an Expense</h3>
        <form onSubmit={this.handleAddExpense}>
          <input type="text" name="name" placeholder="Expense Name"/>
          <input type="number" name="cost" min="1" placeholder="$"/>
          <button >Add</button>
        </form>
      </section>
    );
  }
}

// Expenses ========================================
const Expenses = (props) => {
  return (
    <section id="expenses" className="container">
      <h2 className="text-center text-muted">Expenses</h2>
      {/* <table class="expense table table-sm table-striped table-bordered table-hover"> */}
      <table className="expense table table-striped table-bordered table-hover">
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
    </section>
  );
};

// Expense ==========================================
const Expense = (props) => {
  return (
    <tr>
      <td className="expense-edit-btn">
        <button className="btn btn-secondary" onClick={(e) => {
          //todo props.handleEditExpense()
          console.log('edit')
        }}>Edit</button>
      </td>
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

ReactDOM.render(<BudgetApp />, document.getElementById('app'));
