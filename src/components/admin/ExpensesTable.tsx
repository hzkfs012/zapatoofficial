
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import { AddExpenseForm } from './AddExpenseForm';

type Expense = Database['public']['Tables']['expenses']['Row'];

const expensesPerPage = 10;

const fetchExpenses = async (page: number) => {
    const from = page * expensesPerPage;
    const to = from + expensesPerPage - 1;
    const { data, error, count } = await supabase
        .from('expenses')
        .select('*', { count: 'exact' })
        .order('expense_date', { ascending: false })
        .range(from, to);

    if (error) throw new Error(error.message);
    return { data, count };
};

export const ExpensesTable = () => {
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(0);
    const { data, isLoading, error } = useQuery({
        queryKey: ['expenses', currentPage],
        queryFn: () => fetchExpenses(currentPage),
    });

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    
    if (isLoading) return <div>Loading expenses...</div>;
    if (error) return <div>Error loading expenses: {(error as Error).message}</div>;

    const expenses = data?.data ?? [];
    const totalExpenses = data?.count ?? 0;
    const totalPages = Math.ceil(totalExpenses / expensesPerPage);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Expense</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Expense</DialogTitle>
                        </DialogHeader>
                        <AddExpenseForm 
                            onSuccess={() => {
                                setIsAddDialogOpen(false);
                                toast.success('Expense added successfully!');
                                queryClient.invalidateQueries({ queryKey: ['expenses'] });
                                queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>{new Date(expense.expense_date + 'T00:00:00').toLocaleDateString()}</TableCell>
                                <TableCell className="capitalize">{expense.category}</TableCell>
                                <TableCell>{expense.description}</TableCell>
                                <TableCell className="text-right">
                                    ₹{(expense.amount / 100).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(old => Math.max(old - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(old => (old + 1 < totalPages ? old + 1 : old))}
                    disabled={currentPage + 1 >= totalPages}
                >
                    Next
                </Button>
            </div>
        </>
    );
};
