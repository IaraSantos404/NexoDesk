// src/mocks/handlers.ts
import { http, HttpResponse, delay } from "msw";
import seed from "@/data/tickets.json";
import type {Ticket} from "@/types/ticket";


const KEY = "nexodesk:tickets";

const load = (): Ticket[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.error("Erro ao carregar chamados do localStorage:", error);
  }
  return seed as Ticket[];
};

const save = () => localStorage.setItem(KEY, JSON.stringify(tickets));

let tickets = load();

export const handlers = [
  // Get
  http.get("/tickets", async () => {
    await delay(400);
    return HttpResponse.json(tickets);
  }),

  // get id
  http.get("/tickets/:id", async ({ params }) => {
    await delay(300);

    const ticket = tickets.find((t) => t.id === params.id);

    if (!ticket) {
      return HttpResponse.json(
        { message: "Chamado não encontrado" },
        { status: 404 }
      );
    }
    return HttpResponse.json(ticket);
  }),

  // post
  http.post("/tickets", async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as Pick<
      Ticket,
      "title" | "description" | "email" | "sector" | "priority" | "status" | "requester"
    >;

    const now = new Date().toISOString();

    const newTicket: Ticket = {
      ...body,
      id: crypto.randomUUID(),
      status: body.status ?? "Aberto",
      createdAt: now,
      updatedAt: now,
    };

    tickets = [newTicket, ...tickets];
    save();
    return HttpResponse.json(newTicket, { status: 201 });
  }),

  // patch
  http.patch("/tickets/:id", async ({ params, request }) => {
    await delay(300);

    const body = (await request.json()) as Partial<Ticket>;
    const index = tickets.findIndex((t) => t.id === params.id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Chamado não encontrado" },
        { status: 404 }
      );
    }

    tickets[index] = {
      ...tickets[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    save();
    return HttpResponse.json(tickets[index]);
  }),

  // delete
  http.delete("/tickets/:id", async ({ params }) => {
    await delay(300);

    const exists = tickets.some((t) => t.id === params.id);

    if (!exists) {
      return HttpResponse.json(
        { message: "Chamado não encontrado" },
        { status: 404 }
      );
    }

    tickets = tickets.filter((t) => t.id !== params.id);
    save();
    return new HttpResponse(null, { status: 204 });
  }),
];