export interface ITopic {
  interestTopicId: number
  topicName: string
  activeYn: string
  ord: number
  managerCount: number
}

export interface ISalesInquiries {
  inquiryManagerId: number
  interestTopicId: number
  module: string
  email: string
  activeYn: string
  ord: number
}
