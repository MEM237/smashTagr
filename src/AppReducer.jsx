export const initialState = {
  halfSmash: {
    cmid: null,
    diit: null,
    ictm: null,
  },
  user: {
    camPermission: false,
    feedSig: null,
  },
  reflex: {
    mood: "neutral",
    threatLevel: 0,
    reflexLevel: "baseline",
  },
  agents: {},
  logs: [],
  agentInterventions: [],
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_HALF_SMASH":
      return {
        ...state,
        halfSmash: {
          cmid: action.payload.cmid,
          diit: action.payload.diit,
          ictm: action.payload.ictm,
        },
      }

    case "CLEAR_IDENTITY":
      return {
        ...state,
        halfSmash: {
          cmid: null,
          diit: null,
          ictm: null,
        },
        user: {
          ...state.user,
          feedSig: null,
        },
        agents: {},
        logs: [],
        agentInterventions: [],
      }

    // REMOVED "RESET_IDENTITY" CASE

    case "SET_FEEDSIG":
      return {
        ...state,
        user: {
          ...state.user,
          feedSig: action.payload.feedSig,
        },
      }

    case "SET_CAM_PERMISSION":
      return {
        ...state,
        user: {
          ...state.user,
          camPermission: action.payload,
        },
      }

    case "UPDATE_REFLEX":
      return {
        ...state,
        reflex: {
          ...state.reflex,
          ...action.payload,
        },
      }

    case "AGENT_INTERVENTION":
      return {
        ...state,
        agentInterventions: [
          ...(state.agentInterventions || []),
          action.payload,
        ],
      }

    case "ADD_LOG":
      return {
        ...state,
        logs: [...state.logs, action.payload],
      }

    case "SET_AGENTS":
      return {
        ...state,
        agents: {
          ...state.agents,
          ...action.payload,
        },
      }

    default:
      return state
  }
}