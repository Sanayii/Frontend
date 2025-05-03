export enum ServiceStatus {
  Service_Requested = 1,
  In_Progress=2,
  Artisan_On_The_Way=3,
  Artisan_Nearing_Location=4,
  Artisan_Arrived=5,
  Service_Undergoing=6,
  Service_Completed=7,
  Service_Cancelled=8,
  Awaiting_Approval=9,
  Artisan_Busy=10,
  Service_done_Successfully_you_Should_complete_payment_method=11,
  Service_done_Successfully_and_payment_done_Successfully=12,
  Service_Failed=13
}
export enum ServiceStatusText {
  Service_Requested = 'Service Requested',
  In_Progress = 'In Progress',
  Artisan_On_The_Way = 'Artisan on the Way',
  Artisan_Nearing_Location = 'Artisan Nearing Location',
  Artisan_Arrived = 'Artisan Arrived',
  Service_Undergoing = 'Service Undergoing',
  Service_Completed = 'Service Completed',
  Service_Cancelled = 'Service Cancelled',
  Awaiting_Approval = 'Awaiting Approval',
  Artisan_Busy = 'Artisan Busy',
  Service_done_Successfully_you_Should_complete_payment_method = 'Service done Successfully, you Should complete payment method!',
  Service_done_Successfully_and_payment_done_Successfully = 'Service done Successfully, and payment done Successfully',
  Service_Failed = 'Service Failed'
}
