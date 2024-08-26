import Budget from "./budget"

export default interface BudgetClient {
    name: string,
    phone: string,
    email: string,
    date: Date,
    hiredServices: Budget 
}