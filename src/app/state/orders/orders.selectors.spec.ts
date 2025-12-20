import * as OrdersSelectors from './orders.selectors';
import { OrdersState } from './orders.model';

describe('Orders Selectors', () => {

  const mockOrdersState: OrdersState = {
    list: [
      {
        id: '1',
        orderNumber: 'ORD-001',
        items: [],
        total: 100,
        paymentMethod: 'card',
        status: 'paid',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        items: [],
        total: 200,
        paymentMethod: 'paypal',
        status: 'delivered',
        createdAt: '2024-01-02'
      }
    ],
    selected: {
      id: '2',
      orderNumber: 'ORD-002',
      items: [],
      total: 200,
      paymentMethod: 'paypal',
      status: 'delivered',
      createdAt: '2024-01-02'
    },
    lastOrder: {
      id: '3',
      orderNumber: 'ORD-003',
      items: [],
      total: 300,
      paymentMethod: 'card',
      status: 'paid',
      createdAt: '2024-01-03'
    },
    loading: false,
    error: null
  };

  const mockState = {
    orders: mockOrdersState
  };
  it('should select orders list', () => {
    const result = OrdersSelectors.selectOrdersList(mockState);
    expect(result.length).toBe(2);
  });

  it('should select selected order', () => {
    const result = OrdersSelectors.selectSelectedOrder(mockState);
    expect(result?.id).toBe('2');
  });

  it('should select loading', () => {
    const result = OrdersSelectors.selectOrdersLoading(mockState);
    expect(result).toBe(false);
  });

  it('should select error', () => {
    const result = OrdersSelectors.selectOrdersError(mockState);
    expect(result).toBeNull();
  });

  it('should select last order', () => {
    const result = OrdersSelectors.selectLastOrder(mockState);
    expect(result?.orderNumber).toBe('ORD-003');
  });

  it('should select last order number', () => {
    const result = OrdersSelectors.selectLastOrderNumber(mockState);
    expect(result).toBe('ORD-003');
  });

  it('should select last order id', () => {
    const result = OrdersSelectors.selectLastOrderId(mockState);
    expect(result).toBe('3');
  });

  it('should count orders', () => {
    const result = OrdersSelectors.selectOrdersCount(mockState);
    expect(result).toBe(2);
  });

  it('should compute total orders amount', () => {
    const result = OrdersSelectors.selectOrdersTotalAmount(mockState);
    expect(result).toBe(300);
  });

  it('should count delivered orders', () => {
    const result = OrdersSelectors.selectDeliveredOrdersCount(mockState);
    expect(result).toBe(1);
  });

});
