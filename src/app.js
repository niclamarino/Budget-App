class BudgetApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddExpense = this.handleAddExpense.bind(this)
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this)
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
  handleAddExpense(expense) {
    this.setState((prevState) => ({
      expenseList : prevState.expenseList.concat(expense)
    }));
  }
  handleDeleteExpense() {
    //todo
  }
  render() {
    return (
      <div className="container">
        <Header
          totalBudget={this.state.totalBudget}    totalExpenses={this.state.totalExpenses}
        />
        <AddExpense
           // expenseList={this.state.expenseList}
           handleAddExpense={this.handleAddExpense}
        />
        <Expenses expenseList={this.state.expenseList} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <header>
      <h1>Budget: $ {props.totalBudget}</h1>
      <h2>Total Expenses: $ {props.totalExpenses}</h2>
    </header>
  );
};

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

  }
  render() {
    const style={background: "#daffdc"} //todo remove --temporary bc chrome devtools doesn't show outlines for me
    return (
      <div>
        <h3>Add an Expense</h3>
        <form onSubmit={this.handleAddExpense}>
          <input  style={style} type="text" name="name" placeholder="Expense Name"/>
          <input  style={style} type="number" name="cost" placeholder="$"/>
          <button style={style} >Add</button>
        </form>
      </div>
    );
  }
}

const Expenses = (props) => {
  return (
    <section id="expenses">
      <h4>Expenses</h4>
      {
        props.expenseList.map((expense) => (
          <Expense
            key= {expense.name}
            expenseName = {expense.name}
            expenseCost = {expense.cost}
          />
        ))
      }
    </section>
  );
};

const Expense = (props) => {
  return (
    <div>
      <table class="expense">
        <tr>
          <td class="expense-name">{props.expenseName}</td>
          <td class="expense-cost">$ {props.expenseCost}</td>
          <td class="expense-remove"><button>Remove</button></td>
        </tr>
      </table>
    </div>
  );
};

ReactDOM.render(<BudgetApp />, document.getElementById('app'));
