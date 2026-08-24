/**
 * Enums compartidos entre API y Web. Fuente única de verdad para estados de dominio.
 * OJO: los estados OCPP (ChargePointStatus) usan exactamente los strings del protocolo
 * OCPP 1.6J — no los renombres, el cargador los envía literalmente.
 */

/** Estados de conector/CP según OCPP 1.6J StatusNotification. */
export enum ChargePointStatus {
  Available = 'Available',
  Preparing = 'Preparing',
  Charging = 'Charging',
  SuspendedEV = 'SuspendedEV',
  SuspendedEVSE = 'SuspendedEVSE',
  Finishing = 'Finishing',
  Reserved = 'Reserved',
  Unavailable = 'Unavailable',
  Faulted = 'Faulted',
  /** No es un estado OCPP: lo fija el watchdog cuando no llega Heartbeat en 2×interval. */
  Offline = 'Offline',
}

/** Estado interno de la sesión de carga (máquina de estados, sección 5.3 del spec). */
export enum ChargingSessionStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  STARTED = 'STARTED',
  CHARGING = 'CHARGING',
  STOPPING = 'STOPPING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

/**
 * Tipo de límite que el conductor/operador fija a una carga (spec §6.3 — "límites de carga").
 * UNIDADES de `limit_value` por tipo (así lo envía el front y lo persiste la API):
 *   MONEY  = centavos            (tope de gasto)
 *   ENERGY = Wh                  (tope de energía entregada)
 *   TIME   = minutos             (tope de duración desde started_at)
 *   SOC    = porcentaje (0..100) (tope de estado de carga de la batería)
 *   FULL   = sin límite          (comportamiento clásico: HOLD = min(disponible, tope de sesión))
 * `FULL` (o ausencia de límite) se persiste como limit_kind NULL en charging_sessions.
 */
export enum ChargeLimitKind {
  MONEY = 'MONEY',
  ENERGY = 'ENERGY',
  TIME = 'TIME',
  SOC = 'SOC',
  FULL = 'FULL',
}

/** Movimientos del libro mayor (append-only). Nunca se editan ni borran. */
export enum WalletTransactionType {
  RECHARGE = 'RECHARGE',
  HOLD = 'HOLD',
  CAPTURE = 'CAPTURE',
  RELEASE = 'RELEASE',
  REFUND = 'REFUND',
  ADJUST = 'ADJUST',
}

/** Tipos de conector físico soportados. */
export enum ConnectorType {
  Type1 = 'Type1',
  Type2 = 'Type2',
  GBT = 'GBT',
  CCS1 = 'CCS1',
  CCS2 = 'CCS2',
  CHAdeMO = 'CHAdeMO',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  ERROR = 'ERROR',
}

export enum TariffMode {
  ENERGY = 'ENERGY',
  TIME = 'TIME',
}

export enum TariffScope {
  GLOBAL = 'GLOBAL',
  STATION = 'STATION',
  CONNECTOR_TYPE = 'CONNECTOR_TYPE',
}

/** Autorización OCPP (idTagInfo.status en Authorize / StartTransaction). */
export enum AuthorizationStatus {
  Accepted = 'Accepted',
  Blocked = 'Blocked',
  Expired = 'Expired',
  Invalid = 'Invalid',
}

/** Razón de cierre de sesión (StopTransaction.reason + razones internas). */
export enum StopReason {
  Local = 'Local',
  Remote = 'Remote',
  EmergencyStop = 'EmergencyStop',
  PowerLoss = 'PowerLoss',
  Timeout = 'Timeout',
  DeAuthorized = 'DeAuthorized',
  Reboot = 'Reboot',
  Other = 'Other',
}
