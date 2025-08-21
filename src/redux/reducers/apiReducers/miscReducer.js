import {
  GET_DASHBOARD_DATA,
  GET_GROWTH_RATE,
  GET_TREND,
  GET_TOTAL_WASTE_DATA,
  GET_TOTAL_WASTE_BY_ORGANIZATION,
  GET_TOTAL_PICKUPS_BY_ORGANIZATION,
  GET_CONTRACT_DURATION_FOR_EACH_ORGANIZATION,
  GET_MONTHLY_WASTE_DATA,
  CHANGE_FILTER_ORGANIZATION,
  GET_CONTRACT_EXPRIES,
  GET_TRENDLINE_WASTE_DATA,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  dashboard: null,
  growth_rate: null,
  trend: null,
  totalWastes: null,
  totalWastesByOrganization: null,
  totalPickupsByOrganization: null,
  contractDurationByOrganization: null,
  monthlyWaste: null,
  trendlineWaste: null,
  filterOrganization: null,
  contractExpries: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return { ...state, dashboard: action.payload };
    case GET_GROWTH_RATE:
      return { ...state, growth_rate: action.payload };
    case GET_TREND:
      return { ...state, trend: action.payload };
    case GET_TOTAL_WASTE_DATA:
      return { ...state, totalWastes: action.payload };
    case GET_TOTAL_WASTE_BY_ORGANIZATION:
      return { ...state, totalWastesByOrganization: action.payload };
    case GET_TOTAL_PICKUPS_BY_ORGANIZATION:
      return { ...state, totalPickupsByOrganization: action.payload };
    case GET_CONTRACT_DURATION_FOR_EACH_ORGANIZATION:
      return { ...state, contractDurationByOrganization: action.payload };
    case GET_MONTHLY_WASTE_DATA:
      return { ...state, monthlyWaste: action.payload };
    case GET_TRENDLINE_WASTE_DATA:
      return { ...state, trendlineWaste: action.payload };
    case CHANGE_FILTER_ORGANIZATION:
      return { ...state, filterOrganization: action.payload };
    case GET_CONTRACT_EXPRIES:
      return { ...state, contractExpries: action.payload };
    default:
      return state;
  }
};
