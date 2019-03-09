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
    _this.handleEditExpenseModal = _this.handleEditExpenseModal.bind(_this);
    _this.handleAddBudget = _this.handleAddBudget.bind(_this);
    _this.handleAdjustBudget = _this.handleAdjustBudget.bind(_this);
    _this.state = {
      totalExpenses: 0,
      expenseList: [],
      totalBudget: 0
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
        if (expenseList) {
          this.setState(function () {
            return { expenseList: expenseList };
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

      this.setState(function (prevState) {
        return {
          expenseList: prevState.expenseList.concat(expense),
          totalBudget: parseInt(_this2.state.totalBudget) - parseInt(expense.cost),
          totalExpenses: parseInt(_this2.state.totalExpenses) + parseInt(expense.cost)
        };
      });
    }
    // handleEditExpenseModal =====================================

  }, {
    key: 'handleEditExpenseModal',
    value: function handleEditExpenseModal(expenseToEdit) {
      console.log(expenseToEdit);
    }

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
          handleAddBudget: props.handleAddBudget,
          handleAdjustBudget: props.handleAdjustBudget,
          totalBudget: props.totalBudget
        }),
        React.createElement(AddExpense, {
          handleAddExpense: props.handleAddExpense
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
            props.totalBudget
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

var EnterBudget = function (_React$Component2) {
  _inherits(EnterBudget, _React$Component2);

  function EnterBudget(props) {
    _classCallCheck(this, EnterBudget);

    var _this4 = _possibleConstructorReturn(this, (EnterBudget.__proto__ || Object.getPrototypeOf(EnterBudget)).call(this, props));

    _this4.handleAddBudget = _this4.handleAddBudget.bind(_this4);
    _this4.handleAdjustBudget = _this4.handleAdjustBudget.bind(_this4);
    _this4.state = {
      hasBudget: false
      //todo error state
    };return _this4;
  }

  _createClass(EnterBudget, [{
    key: 'handleAddBudget',
    value: function handleAddBudget(e) {
      e.preventDefault();
      var budget = e.target.elements.budget.value;
      //todo error handling
      this.props.handleAddBudget(budget);
      e.target.elements.budget.value = '';
      this.setState(function () {
        return { hasBudget: true };
      });
    }
  }, {
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
        this.state.hasBudget ? React.createElement(
          'form',
          { onSubmit: this.handleAdjustBudget },
          React.createElement(
            'label',
            null,
            'Add to or Subtract from Budget'
          ),
          React.createElement('input', { className: 'cost-input', type: 'number', name: 'adjustment', placeholder: '+/-' }),
          React.createElement(
            'button',
            { className: 'btn btn-dark' },
            'Submit'
          )
        ) : React.createElement(
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

// AddExpense ======================================


var AddExpense = function (_React$Component3) {
  _inherits(AddExpense, _React$Component3);

  function AddExpense(props) {
    _classCallCheck(this, AddExpense);

    var _this5 = _possibleConstructorReturn(this, (AddExpense.__proto__ || Object.getPrototypeOf(AddExpense)).call(this, props));

    _this5.handleAddExpense = _this5.handleAddExpense.bind(_this5);
    _this5.state = {
      error: undefined
    };
    return _this5;
  }

  _createClass(AddExpense, [{
    key: 'handleAddExpense',
    value: function handleAddExpense(e) {
      e.preventDefault();
      var name = e.target.elements.name.value.trim();
      var cost = e.target.elements.cost.value;
      this.props.handleAddExpense({ name: name, cost: cost });
      e.target.elements.name.value = '';
      e.target.elements.cost.value = '';
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
            handleDeleteExpense: props.handleDeleteExpense,
            handleEditExpenseModal: props.handleEditExpenseModal
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
      { className: 'expense-edit-btn' },
      React.createElement(
        'button',
        { className: 'btn btn-secondary', onClick: function onClick(e) {
            props.handleEditExpenseModal({ name: props.expenseName, cost: props.expenseCost });
          } },
        'Edit'
      )
    ),
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
