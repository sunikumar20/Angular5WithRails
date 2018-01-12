class EmployeesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    # binding.pry
    render json: Employee.all.select(:id, :firstname)
  end

  def new
  end

  def create
    employee = Employee.create(employee_params)
    
    render json: employee #.select(:id, :firstname)
  end

  def edit
  end

  def update
    employee = Employee.find_by_id(params[:id])
    employee.update(employee_params)
    render json: employee 
  end

  def destroy
    employee = Employee.find_by_id(params[:id])
    employee.destroy!
    render json: {deleted: true}, status: 200
  end

  private

  def employee_params
    params.require(:employee).permit(:firstname, :lastname)
  end
end
