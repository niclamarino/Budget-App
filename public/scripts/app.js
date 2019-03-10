'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BudgetApp = function (_React$Component) {
  _inherits(BudgetApp, _React$Component);

  function BudgetApp(props) {
    _classCallCheck(this, BudgetApp);

    var _this = _possibleConstructorReturn(this, (BudgetApp.__proto__ || Object.getPrototypeOf(BudgetApp)).call(this, props));

    _this.handleAddExpense = _this.handleAddExpense.bind(_this);
    _this.handleDeleteExpense = _this.handleDeleteExpense.bind(_this);
    // this.handleEditExpenseModal = this.handleEditExpenseModal.bind(this)
    _this.handleAddBudget = _this.handleAddBudget.bind(_this);
    _this.handleAdjustBudget = _this.handleAdjustBudget.bind(_this);
    _this.state = {
      totalExpenses: 0,
      expenseList: [],
      totalBudget: undefined
    };
    return _this;
  }
  // lifecycle hooks ==========================================


  _createClass(BudgetApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('componentDidMount');
      try {
        var json = localStorage.getItem('expenseList');
        var expenseList = JSON.parse(json);
        var stringBudget = localStorage.getItem('totalBudget');
        var totalBudget = parseInt(stringBudget);
        var stringTotalExpenses = localStorage.getItem('totalExpenses');
        var totalExpenses = parseInt(stringTotalExpenses);
        if (expenseList) {
          this.setState(function () {
            return { expenseList: expenseList };
          });
        }
        if (totalBudget) {
          this.setState(function () {
            return { totalBudget: totalBudget };
          });
        }
        if (totalExpenses) {
          this.setState(function () {
            return { totalExpenses: totalExpenses };
          });
        }
      } catch (e) {
        // Do nothing
        console.log(e);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      console.log('componentDidUpdate');
      if (prevState.expenseList.length !== this.state.expenseList.length) {
        var json = JSON.stringify(this.state.expenseList);
        localStorage.setItem('expenseList', json);
      }
      if (prevState.totalBudget !== this.state.totalBudget) {
        localStorage.setItem('totalBudget', this.state.totalBudget);
      }
      if (prevState.totalExpenses !== this.state.totalExpenses) {
        localStorage.setItem('totalExpenses', this.state.totalExpenses);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
    }
    // handleAddExpense ========================================

  }, {
    key: 'handleAddExpense',
    value: function handleAddExpense(expense) {
      var _this2 = this;

      console.log(expense);
      var filteredList = this.state.expenseList.filter(function (exp) {
        return expense.name === exp.name && expense.cost === exp.cost;
      });

      if (!expense.name || !expense.cost) {
        return 'Expense name and cost needed.';
      } else if (filteredList.length > 0) {
        return 'This expense already exists.';
      }
      this.setState(function (prevState) {
        return {
          expenseList: prevState.expenseList.concat(expense),
          totalBudget: parseInt(_this2.state.totalBudget) - parseInt(expense.cost),
          totalExpenses: parseInt(_this2.state.totalExpenses) + parseInt(expense.cost)
        };
      });
    }
    // handleEditExpenseModal =====================================
    // handleEditExpenseModal(expenseToEdit) {
    //   console.log(expenseToEdit);
    // }

    // handleDeleteExpense =====================================

  }, {
    key: 'handleDeleteExpense',
    value: function handleDeleteExpense(expenseToRemove) {
      this.setState(function (prevState) {
        return {
          expenseList: prevState.expenseList.filter(function (expense) {
            return expenseToRemove.name !== expense.name && expenseToRemove.cost !== expense.cost;
          }),
          totalBudget: parseInt(prevState.totalBudget) + parseInt(expenseToRemove.cost),
          totalExpenses: parseInt(prevState.totalExpenses) - parseInt(expenseToRemove.cost)
        };
      });
    }

    // handleAddBudget =========================================

  }, {
    key: 'handleAddBudget',
    value: function handleAddBudget(budget) {
      if (parseInt(budget) > 0) {
        this.setState(function () {
          return { totalBudget: budget };
        });
      }
      // todo -value error
    }

    // handleAddBudget =========================================

  }, {
    key: 'handleAdjustBudget',
    value: function handleAdjustBudget(amount) {
      var _this3 = this;

      this.setState(function () {
        return {
          totalBudget: parseInt(_this3.state.totalBudget) + parseInt(amount)
        };
      });
    }

    // render ==================================================

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(Header, {
          totalBudget: this.state.totalBudget,
          totalExpenses: this.state.totalExpenses,
          handleAddBudget: this.handleAddBudget,
          handleAdjustBudget: this.handleAdjustBudget,
          handleAddExpense: this.handleAddExpense
          // hasBudget={this.state.totalBudget>0}
        }),
        React.createElement(Expenses, {
          expenseList: this.state.expenseList,
          handleDeleteExpense: this.handleDeleteExpense,
          handleEditExpenseModal: this.handleEditExpenseModal
        })
      );
    }
  }]);

  return BudgetApp;
}(React.Component);

// Header ==========================================


var Header = function Header(props) {
  var danger = props.totalBudget < 0 ? "danger" : "";
  return React.createElement(
    'header',
    null,
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'header-left' },
        React.createElement(EnterBudget, {
          handleAddBudget: props.handleAddBudget
          // handleAdjustBudget={props.handleAdjustBudget}
          , totalBudget: props.totalBudget
        }),
        React.createElement(AddExpense, {
          handleAddExpense: props.handleAddExpense
          // hasBudget={props.hasBudget}
        })
      ),
      React.createElement(
        'div',
        { className: 'header-right' },
        React.createElement(
          'h1',
          null,
          'Budget: $',
          React.createElement(
            'span',
            { className: danger },
            props.totalBudget || "0"
          )
        ),
        React.createElement(
          'h2',
          null,
          'Total Expenses: $',
          props.totalExpenses
        )
      )
    )
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

var EnterBudget = function (_React$Component2) {
  _inherits(EnterBudget, _React$Component2);

  function EnterBudget(props) {
    _classCallCheck(this, EnterBudget);

    var _this4 = _possibleConstructorReturn(this, (EnterBudget.__proto__ || Object.getPrototypeOf(EnterBudget)).call(this, props));

    _this4.handleAddBudget = _this4.handleAddBudget.bind(_this4);
    //todo error state
    return _this4;
  }

  _createClass(EnterBudget, [{
    key: 'handleAddBudget',
    value: function handleAddBudget(e) {
      e.preventDefault();
      var budget = e.target.elements.budget.value;
      //todo error handling
      this.props.handleAddBudget(budget);
      e.target.elements.budget.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { onSubmit: this.handleAddBudget },
          React.createElement(
            'label',
            null,
            'Enter Budget'
          ),
          React.createElement('input', { className: 'cost-input', type: 'number', name: 'budget', min: '1', placeholder: '$' }),
          React.createElement(
            'button',
            { className: 'btn btn-dark' },
            'Submit'
          )
        )
      );
    }
  }]);

  return EnterBudget;
}(React.Component);

// AdjustBudget =====================================


var AdjustBudget = function (_React$Component3) {
  _inherits(AdjustBudget, _React$Component3);

  function AdjustBudget(props) {
    _classCallCheck(this, AdjustBudget);

    var _this5 = _possibleConstructorReturn(this, (AdjustBudget.__proto__ || Object.getPrototypeOf(AdjustBudget)).call(this, props));

    _this5.handleAdjustBudget = _this5.handleAdjustBudget.bind(_this5);
    return _this5;
  }

  _createClass(AdjustBudget, [{
    key: 'handleAdjustBudget',
    value: function handleAdjustBudget(e) {
      e.preventDefault();
      var amount = e.target.elements.adjustment.value;
      this.props.handleAdjustBudget(amount);
      e.target.elements.adjustment.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { onSubmit: this.handleAdjustBudget },
          React.createElement(
            'label',
            null,
            'Add to or Subtract from Budget'
          ),
          React.createElement('input', { type: 'number', name: 'adjustment', placeholder: '+/-' }),
          React.createElement(
            'button',
            null,
            'Submit'
          )
        )
      );
    }
  }]);

  return AdjustBudget;
}(React.Component);

// AddExpense ======================================


var AddExpense = function (_React$Component4) {
  _inherits(AddExpense, _React$Component4);

  function AddExpense(props) {
    _classCallCheck(this, AddExpense);

    var _this6 = _possibleConstructorReturn(this, (AddExpense.__proto__ || Object.getPrototypeOf(AddExpense)).call(this, props));

    _this6.handleAddExpense = _this6.handleAddExpense.bind(_this6);
    _this6.state = {
      error: undefined
    };
    return _this6;
  }

  _createClass(AddExpense, [{
    key: 'handleAddExpense',
    value: function handleAddExpense(e) {
      e.preventDefault();
      var name = e.target.elements.name.value.trim();
      var cost = e.target.elements.cost.value;
      var error = this.props.handleAddExpense({ name: name, cost: cost });
      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        e.target.elements.name.value = '';
        e.target.elements.cost.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'add-expense' },
        React.createElement(
          'form',
          { onSubmit: this.handleAddExpense },
          React.createElement(
            'label',
            null,
            'Add an Expense'
          ),
          React.createElement('input', { type: 'text', name: 'name', placeholder: 'Expense Name' }),
          React.createElement('input', { className: 'cost-input', type: 'number', name: 'cost', min: '1', placeholder: '$' }),
          React.createElement(
            'button',
            { className: 'btn btn-dark' },
            'Submit'
          )
        ),
        this.state.error && React.createElement(
          'p',
          { 'class': 'error-msg text-center' },
          this.state.error
        )
      );
    }
  }]);

  return AddExpense;
}(React.Component);

// Expenses ========================================


var Expenses = function Expenses(props) {
  return React.createElement(
    'section',
    { id: 'expenses', className: 'container' },
    React.createElement(
      'h2',
      { className: 'text-center text-muted' },
      'Expenses'
    ),
    props.expenseList.length > 0 ? React.createElement(
      'table',
      { className: 'expense table table-striped table-bordered table-hover' },
      React.createElement(
        'tbody',
        null,
        props.expenseList.map(function (expense) {
          return React.createElement(Expense, {
            key: expense.name,
            expenseName: expense.name,
            expenseCost: expense.cost,
            handleDeleteExpense: props.handleDeleteExpense
          });
        })
      )
    ) : React.createElement(
      'p',
      { id: 'empty-expense-list-msg', className: 'text-center' },
      'No expenses to show.'
    )
  );
};

// Expense ==========================================
var Expense = function Expense(props) {
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      { className: 'expense-name' },
      props.expenseName
    ),
    React.createElement(
      'td',
      { className: 'expense-cost' },
      '$',
      props.expenseCost
    ),
    React.createElement(
      'td',
      { className: 'expense-remove-btn' },
      React.createElement(
        'button',
        { className: 'btn btn-danger', onClick: function onClick(e) {
            props.handleDeleteExpense({ name: props.expenseName, cost: props.expenseCost });
          } },
        'Remove'
      )
    )
  );
};

// EditExpense ========================================
var EditExpense = function EditExpense(props) {
  return React.createElement(
    'div',
    { className: 'edit-expense-modal container' },
    React.createElement(
      'form',
      null,
      React.createElement(
        'label',
        null,
        'Edit Expense'
      ),
      React.createElement('input', { type: 'text', name: 'name', placeholder: 'Expense Name' }),
      React.createElement('input', { className: 'cost-input', type: 'number', name: 'cost', min: '1', placeholder: '$' }),
      React.createElement(
        'button',
        { className: 'btn btn-dark' },
        'Submit'
      )
    )
  );
};

ReactDOM.render(React.createElement(BudgetApp, null), document.getElementById('app'));
