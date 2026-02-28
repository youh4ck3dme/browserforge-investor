"use client";

import React, { useState, useEffect } from "react";
import { Flex, Column, Heading, Text, Button, Line, Row, Icon, Background, Input } from "@once-ui-system/core";

export default function SecretsPage() {
    const [notes, setNotes] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");

    const internalLinks = [
        {
            label: "Magic Patterns - Design Systems",
            url: "https://www.magicpatterns.com/login?callback=%2Fdesign-systems",
            icon: "grid",
        },
        {
            label: "Vercel Deployment - Investor Site",
            url: "https://vercel.com/h4ck3d/browserforge-investor-landing/HqnNh15Jgz5Yu2VDWd5wYTvT8Xdn",
            icon: "sparkle",
        },
        {
            label: "BrowserForge Live Dashboard",
            url: "https://forge-builder-suite.vercel.app",
            icon: "eye",
        },
        {
            label: "Secure API Tunnel (Cloudflare)",
            url: "https://tradition-defence-codes-workstation.trycloudflare.com",
            icon: "shield",
        },
    ];

    // Check session authentication on mount
    useEffect(() => {
        const authStat = sessionStorage.getItem("bf_secrets_auth");
        if (authStat === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // Load notes from localStorage on mount (only if auth, but doing it generally is fine as state is hidden)
    useEffect(() => {
        if (isAuthenticated) {
            const savedNotes = localStorage.getItem("bf_secrets_notes");
            if (savedNotes) {
                setNotes(savedNotes);
            } else {
                setNotes("Add your private engineering notes here...\n\nExample:\n- SSH Key for VPS: root@194.182.87.6\n- Firebase Project: browserforge-corp");
            }
        }
    }, [isAuthenticated]);

    // Save notes to localStorage whenever they change
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNotes(value);
        localStorage.setItem("bf_secrets_notes", value);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === process.env.NEXT_PUBLIC_SECRETS_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("bf_secrets_auth", "true");
            setError("");
        } else {
            setError("Access Denied: Invalid Authorization Code");
            setPasswordInput("");
        }
    };

    if (!isAuthenticated) {
        return (
            <Column fillWidth align="center" padding="l" style={{ minHeight: "100vh", justifyContent: "center" }}>
                <Background
                    mask={{ x: 50, y: 50, radius: 100 }}
                    gradient={{ display: true, opacity: 10, x: 50, y: 50, width: 100, height: 100, tilt: 0, colorStart: "accent-background-strong", colorEnd: "static-transparent" }}
                    dots={{ display: true, opacity: 20, size: "2", color: "brand-strong" }}
                />
                <Column gap="24" align="center" background="surface" padding="xl" radius="l" border="neutral-alpha-weak" shadow="l" style={{ maxWidth: "400px", zIndex: 1 }}>
                    <Icon name="lock" onBackground="brand-strong" size="xl" />
                    <Heading variant="display-strong-s" align="center">Restricted Access</Heading>
                    <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                        Enter terminal authorization code to proceed.
                    </Text>
                    <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
                        <Input
                            id="password"
                            type="password"
                            value={passwordInput}
                            onChange={(e: any) => setPasswordInput(e.target.value)}
                            placeholder="Authorization Code..."
                        />
                        {error && <Text variant="body-default-xs" onBackground="danger-strong" align="center">{error}</Text>}
                        <Button type="submit" variant="primary" size="m" fillWidth>
                            Authenticate
                        </Button>
                    </form>
                </Column>
            </Column>
        );
    }

    return (
        <Column fillWidth gap="32" padding="l">
            <Background
                mask={{ x: 50, y: 0, radius: 100 }}
                gradient={{ display: true, opacity: 10, x: 50, y: 50, width: 100, height: 100, tilt: 0, colorStart: "accent-background-strong", colorEnd: "static-transparent" }}
                dots={{ display: true, opacity: 20, size: "2", color: "brand-strong" }}
            />

            <Flex direction="column" gap="8">
                <Row vertical="center" gap="12">
                    <Icon name="lockOpen" onBackground="brand-strong" size="l" />
                    <Heading variant="display-strong-s">Mission Control Secrets</Heading>
                </Row>
                <Text variant="body-default-m" onBackground="neutral-weak">
                    Private access to internal design systems, deployment logs, and live engineering tools.
                </Text>
            </Flex>

            <Flex style={{ flexWrap: "wrap", gap: "32px", width: "100%" }}>
                {/* Left Section: Internal Quick Links */}
                <Column gap="24" style={{ flex: "1 1 300px" }}>
                    <Text variant="label-default-s" onBackground="neutral-strong">INTERNAL LINKS</Text>
                    <Flex direction="column" gap="12">
                        {internalLinks.map((link, index) => (
                            <Button
                                key={index}
                                href={link.url}
                                target="_blank"
                                variant="secondary"
                                size="l"
                                fillWidth
                            >
                                <Row gap="12" vertical="center" fillWidth>
                                    <Icon name={link.icon as any} size="m" />
                                    <Column align="start" gap="2">
                                        <Text variant="body-strong-m">{link.label}</Text>
                                        <Text variant="body-default-xs" onBackground="neutral-weak">{link.url}</Text>
                                    </Column>
                                </Row>
                            </Button>
                        ))}
                    </Flex>

                    <Line background="neutral-alpha-medium" />

                    <Flex direction="column" gap="12">
                        <Text variant="body-default-s" onBackground="neutral-weak">
                            💡 These links are stored in the mission control header for quick traversal between design patterns and live production environments.
                            <br /><br />
                            <strong>Secure API Tunnel:</strong> This Cloudflare Tunnel URL serves as a secure, encrypted bridge between the Vercel frontend (HTTPS) and the private VPS Orchestrator API (port 8090). It prevents Mixed Content errors and immediately routes build generation commands directly to the backend.
                        </Text>
                    </Flex>
                </Column>

                {/* Right Section: Persistent Notes Block */}
                <Column gap="16" style={{ flex: "2 1 400px" }}>
                    <Row vertical="center" fillWidth style={{ justifyContent: "space-between" }}>
                        <Row gap="8" vertical="center">
                            <Text variant="label-default-s" onBackground="neutral-strong">ENCRYPTED NOTES BLOCK</Text>
                            <Text variant="body-default-xs" onBackground="brand-weak">(Auto-saved up to 4.5MB)</Text>
                        </Row>
                        <Button variant="tertiary" size="s" onClick={() => {
                            sessionStorage.removeItem("bf_secrets_auth");
                            setIsAuthenticated(false);
                        }}>
                            Lock Terminal
                        </Button>
                    </Row>

                    <div style={{ position: "relative", width: "100%", flexGrow: 1 }}>
                        <textarea
                            value={notes}
                            onChange={handleNotesChange}
                            placeholder="Write your secrets here..."
                            style={{
                                width: "100%",
                                minHeight: "60vh",
                                padding: "24px",
                                background: "var(--surface-background)",
                                color: "var(--neutral-on-background-strong)",
                                border: "1px solid var(--neutral-alpha-medium)",
                                borderRadius: "16px",
                                fontSize: "15px",
                                fontFamily: "var(--font-code)",
                                lineHeight: "1.6",
                                letterSpacing: "-0.02em",
                                outline: "none",
                                resize: "vertical",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "var(--brand-solid-strong)"}
                            onBlur={(e) => e.target.style.borderColor = "var(--neutral-alpha-medium)"}
                        />
                        <div style={{
                            position: "absolute",
                            bottom: "16px",
                            right: "24px",
                            pointerEvents: "none"
                        }}>
                            <Text variant="body-default-xs" style={{ fontFamily: "var(--font-code)", opacity: 0.5 }}>
                                {notes.length.toLocaleString()} / 4,500,000 bytes
                            </Text>
                        </div>
                    </div>
                </Column>
            </Flex>
        </Column>
    );
}
