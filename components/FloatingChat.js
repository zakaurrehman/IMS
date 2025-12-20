'use client';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { SettingsContext } from "../contexts/useSettingsContext";
import { UserAuth } from "../contexts/useAuthContext";
import { loadData } from '../utils/utils';
import { MessageCircle, X, Send, Loader2, Trash2, Sparkles } from 'lucide-react';
import { BsRobot, BsPerson } from "react-icons/bs";
import dateFormat from "dateformat";

const FloatingChat = () => {
    const { settings, dateSelect } = useContext(SettingsContext);
    const { uidCollection } = UserAuth();

    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Store loaded data
    const [contractsData, setContractsData] = useState([]);
    const [invoicesData, setInvoicesData] = useState([]);
    const [expensesData, setExpensesData] = useState([]);

    // Load data when chat opens
    useEffect(() => {
        const loadAllData = async () => {
            if (!uidCollection || !dateSelect || !chatOpen) return;
            if (contractsData.length > 0) return; // Already loaded

            setDataLoading(true);
            try {
                const [contracts, invoices, expenses] = await Promise.all([
                    loadData(uidCollection, 'contracts', dateSelect),
                    loadData(uidCollection, 'invoices', dateSelect),
                    loadData(uidCollection, 'expenses', dateSelect)
                ]);

                setContractsData(contracts || []);
                setInvoicesData(invoices || []);
                setExpensesData(expenses || []);
            } catch (err) {
                console.error('Error loading data:', err);
            } finally {
                setDataLoading(false);
            }
        };

        if (chatOpen) {
            loadAllData();
        }
    }, [uidCollection, dateSelect, chatOpen]);

    // Initialize welcome message when chat opens
    useEffect(() => {
        if (chatOpen && messages.length === 0) {
            setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: `Hi! I'm your IMS Assistant. How can I help you today?`,
                time: dateFormat(new Date(), 'h:MM TT')
            }]);
        }
    }, [chatOpen]);

    // Scroll to bottom
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Focus input when chat opens
    useEffect(() => {
        if (chatOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [chatOpen]);

    // Prepare data context for API
    const getCurrentDataContext = useCallback(() => {
        const formatContract = (con) => ({
            id: con.id,
            order: con.order,
            supplier: con.supplier,
            date: con.date,
            origin: con.origin,
            currency: con.cur,
            status: con.conStatus,
            products: con.productsData?.length || 0,
            dateRange: con.dateRange
        });

        const formatInvoice = (inv) => ({
            id: inv.id,
            invoice: inv.invoice,
            client: inv.client,
            date: inv.date,
            status: inv.invoiceStatus,
            totalAmount: inv.totalAmount,
            currency: inv.cur,
            dueDate: inv.delDate?.endDate,
            canceled: inv.canceled
        });

        const formatExpense = (exp) => ({
            id: exp.id,
            vendor: exp.vendor,
            date: exp.date,
            amount: exp.amount,
            currency: exp.cur,
            type: exp.expType,
            status: exp.paidUnpaid
        });

        return {
            contracts: contractsData.map(formatContract),
            invoices: invoicesData.map(formatInvoice),
            expenses: expensesData.map(formatExpense),
            summary: {
                totalContracts: contractsData.length,
                totalInvoices: invoicesData.length,
                totalExpenses: expensesData.length,
                pendingInvoices: invoicesData.filter(inv => inv.invoiceStatus !== 'Paid' && !inv.canceled).length
            }
        };
    }, [contractsData, invoicesData, expensesData]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || isLoading) return;

        const userMsg = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: newMessage,
            time: dateFormat(new Date(), 'h:MM TT')
        };

        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');
        setIsLoading(true);

        try {
            const apiMessages = [...messages, userMsg]
                .filter(m => m.id !== 'welcome')
                .map(m => ({ role: m.role, content: m.content }));

            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessages,
                    currentData: getCurrentDataContext()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            setMessages(prev => [...prev, {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: data.message,
                time: dateFormat(new Date(), 'h:MM TT')
            }]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: `Sorry, I encountered an error. Please try again.`,
                time: dateFormat(new Date(), 'h:MM TT'),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClearChat = () => {
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: `Hi! I'm your IMS Assistant. How can I help you today?`,
            time: dateFormat(new Date(), 'h:MM TT')
        }]);
    };

    // Format message content for better display
    const formatMessageContent = (content) => {
        if (!content) return '';
        let formatted = content;
        // Convert **bold** to styled spans
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Convert bullet points to styled bullets
        formatted = formatted.replace(/^[•\-]\s*/gm, '<span class="text-blue-600 mr-1">•</span>');
        // Convert numbered lists
        formatted = formatted.replace(/^(\d+)\.\s+/gm, '<span class="text-blue-600 font-medium mr-1">$1.</span>');
        // Convert line breaks
        formatted = formatted.replace(/\n/g, '<br/>');
        return formatted;
    };

    // Don't render if settings not loaded
    if (Object.keys(settings || {}).length === 0) return null;

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setChatOpen(!chatOpen)}
                className={`fixed bottom-4 right-4 p-3.5 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
                    chatOpen
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-gradient-to-r from-[var(--endeavour)] to-[var(--chathams-blue)] hover:opacity-90'
                }`}
            >
                {chatOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Chat Window */}
            {chatOpen && (
                <div className="fixed bottom-20 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="p-3 bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">IMS Assistant</h3>
                                <p className="text-white/70 text-xs">
                                    {dataLoading ? 'Loading data...' : `${contractsData.length} contracts, ${invoicesData.length} invoices`}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClearChat}
                            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                            title="Clear chat"
                        >
                            <Trash2 className="w-4 h-4 text-white/80" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 bg-gray-50/50 space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--endeavour)] to-[var(--chathams-blue)] flex items-center justify-center mr-2 flex-shrink-0">
                                        <BsRobot className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                                        msg.role === 'user'
                                            ? 'bg-gradient-to-r from-[var(--endeavour)] to-[var(--chathams-blue)] text-white rounded-br-md'
                                            : msg.isError
                                                ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-md'
                                                : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                                    }`}
                                >
                                    <div
                                        className="break-words leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: formatMessageContent(msg.content) }}
                                    />
                                    <span className={`text-[10px] mt-1 block text-right ${
                                        msg.role === 'user' ? 'text-white/60' : 'text-gray-400'
                                    }`}>
                                        {msg.time}
                                    </span>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-7 h-7 rounded-full bg-[var(--port-gore)] flex items-center justify-center ml-2 flex-shrink-0">
                                        <BsPerson className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Loading */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--endeavour)] to-[var(--chathams-blue)] flex items-center justify-center mr-2">
                                    <BsRobot className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="bg-white text-gray-700 shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-3 py-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-[var(--endeavour)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-[var(--endeavour)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-[var(--endeavour)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions (only show initially) */}
                    {messages.length <= 1 && !isLoading && (
                        <div className="px-3 py-2 border-t border-gray-100 bg-white">
                            <div className="flex flex-wrap gap-1.5">
                                {['Show overdue invoices', 'List contracts', 'How to create invoice?'].map((action) => (
                                    <button
                                        key={action}
                                        onClick={() => {
                                            setNewMessage(action);
                                            setTimeout(() => handleSendMessage(), 100);
                                        }}
                                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-600 transition-colors"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                disabled={isLoading || dataLoading}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--endeavour)] focus:ring-1 focus:ring-[var(--endeavour)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim() || isLoading || dataLoading}
                                className="p-2 bg-gradient-to-r from-[var(--endeavour)] to-[var(--chathams-blue)] text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingChat;
